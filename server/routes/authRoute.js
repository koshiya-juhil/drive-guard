const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const User = require("../models/User");

require("dotenv").config();

const redirect_uris = [`${process.env.MODE === 'prod' ?  process.env.ORIGIN_PROD : process.env.ORIGIN_DEV}/report`];

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirect_uris[0]
);

const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/drive",
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPE,
  include_granted_scopes: true,
  prompt: "consent"
});

router.get("/getAuthUrl", (req, res) => {
  res.status(200).send(authUrl);
  // setTimeout(() => {
  //   res.status(200).send(authUrl);
  // }, 3000);
});

router.post("/getToken", async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).send("Invalid Request");

  try {
    const { tokens } = await oAuth2Client.getToken(code);

    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    
    if (!accessToken) {
      console.error("No access token received from OAuth response");
      return res.status(400).send("Authentication failed: No access token received");
    }
    
    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    // Get user info from token
    const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
    const email = tokenInfo.email;

    let user = await User.findOne({ email: email });
    
    // if user exist update tokens
    if (user) {
      user.access_token = accessToken;
      // Only update refresh token if we received a new one
      if (refreshToken) {
        user.refresh_token = refreshToken;
      }
      await user.save();
    } else {
      // create new user
      // Make sure we have a refresh token for new users
      if (!refreshToken) {
        console.error("No refresh token received for new user");
        return res.status(400).send("Authentication failed: No refresh token received");
      }
      
      const userDocument = new User({
        email: email,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      await userDocument.save();
    }

    res.status(200).send({ email: email, msg: "Authentication successful" });
  } catch (error) {
    console.log("error", error);
    
    // Provide more descriptive error messages
    if (error.message && error.message.includes("invalid_grant")) {
      return res.status(400).send("Authentication failed: Invalid or expired authorization code");
    }
    
    res.status(500).send("Internal Server Error");
  }
});

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

router.get("/getReport", async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).send("User not found");

  try {
    // Use decryption methods to get the actual tokens
    const decryptedTokens = user.decryptedTokens;

    oAuth2Client.setCredentials({
      access_token: decryptedTokens.access_token,
      refresh_token: decryptedTokens.refresh_token,
    });

    // Verify token is valid by making a test request
    try {
      await oAuth2Client.getTokenInfo(decryptedTokens.access_token);
    } catch (tokenError) {
      console.log("Token validation error:", tokenError.message);
      
      // Try to refresh the token
      try {
        const { credentials } = await oAuth2Client.refreshAccessToken();
        
        // Update user with new tokens
        user.access_token = credentials.access_token;
        if (credentials.refresh_token) {
          user.refresh_token = credentials.refresh_token;
        }
        await user.save();
        
        // Update credentials for current request
        oAuth2Client.setCredentials(credentials);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError.message);
        return res.status(401).send("Authentication expired. Please log in again.");
      }
    }

    // Continue with the existing code to get files
    let allFiles = [];
    let nextPageToken = null;

    do {
      const fileList = await drive.files.list({
        fields: "nextPageToken, files(id, name, mimeType, owners, permissions)",
        pageSize: 1000,
        pageToken: nextPageToken,
      });

      allFiles.push(...fileList.data.files);
      nextPageToken = fileList.data.nextPageToken;
    } while (nextPageToken);

    const publicFiles = [];
    const peopleFiles = [];
    const externalFiles = [];
    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];
      if (file.permissions && file.permissions.length) {
        file.shared = file.permissions.length;

        const isPublic = file.permissions.some((p) => p.type === "anyone");
        if (isPublic) {
          file.shared--;
          file.isPublic = true;
        }

        const isOwner = file.owners.some((o) => o.emailAddress === email);
        if (isOwner) file.isOwner = true;

        let isShared = file.permissions.some((p) => p.emailAddress === email);
        if (isShared) file.shared--;

        if (!isOwner && isShared) {
          file.sharedtome = true;
        }

        // add files to peopleFiles
        file.permissions.forEach((permission) => {
          if (!file.isPublic && permission.emailAddress != email) {
            const index = peopleFiles.findIndex(
              (obj) => obj.email === permission.emailAddress
            );
            if (index != -1) {
              peopleFiles[index].files.push(file);
            } else {
              const obj = {
                name: permission.displayName,
                email: permission.emailAddress,
                id: permission.id,
                photoUrl: permission.photoLink,
                files: [file],
              };
              peopleFiles.push(obj);
            }
          }
        });

        // add files to externalFiles
        if (!isPublic) {
          if (file.permissions.length > 1 && isOwner) {
            externalFiles.push(file);
          } else if (isShared && !isOwner) {
            externalFiles.push(file);
          }
        }

        if (isPublic && isShared) {
          publicFiles.push(file);
        }

      }
    }

    res.status(200).send({
      publicFiles,
      peopleFiles,
      externalFiles,
    });
  } catch (error) {
    console.log("Error retrieving report: ", error);
    res.status(500).send("Error retrieving report");
  }
});

// Update permissions for multiple files
router.post("/updatePermissions", async (req, res) => {
  try {
    const { email, fileIds, accessLevel } = req.body;
    
    if (!email) return res.status(400).send("Email is required");
    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).send("Valid file IDs are required");
    }
    if (!accessLevel) return res.status(400).send("Access level is required");
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    // Get decrypted tokens
    const decryptedTokens = user.decryptedTokens;

    // Set credentials for the OAuth client
    oAuth2Client.setCredentials({
      access_token: decryptedTokens.access_token,
      refresh_token: decryptedTokens.refresh_token,
    });

    // Create Drive client with OAuth
    const driveClient = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    // Process each file
    const results = [];
    const errors = [];

    for (const fileId of fileIds) {
      try {
        // First, get current permissions to find the "anyone" permission
        const permissionsResponse = await driveClient.permissions.list({
          fileId: fileId,
          fields: "permissions(id, type, role)",
        });

        const permissions = permissionsResponse.data.permissions || [];
        const anyonePermission = permissions.find(p => p.type === "anyone");

        if (anyonePermission) {
          if (accessLevel === 'private') {
            // Remove the "anyone" permission to make the file private
            const response = await driveClient.permissions.delete({
              fileId: fileId,
              permissionId: anyonePermission.id,
            });
          } else if (accessLevel === 'domain') {
            // Remove the "anyone" permission
            const response = await driveClient.permissions.delete({
              fileId: fileId,
              permissionId: anyonePermission.id,
            });
            
            // Add a domain-wide permission
            const domainName = email.split('@')[1]; // Extract domain from email
            const domainResponse = await driveClient.permissions.create({
              fileId: fileId,
              requestBody: {
                type: "domain",
                role: "reader",
                domain: domainName,
              },
            });
          }
        }
        
        results.push({ fileId, success: true });
      } catch (error) {
        console.error(`Error updating permissions for file ${fileId}:`, error);
        errors.push({ fileId, error: error.message });
      }
    }

    res.status(200).json({
      message: `Updated permissions for ${results.length} files`,
      success: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error updating permissions:", error);
    res.status(500).send("Error updating permissions");
  }
});

router.post("/revokeaccess", async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).send("Email is required");
        }
        
        const user = await User.findOne({ email: email });
        
        if (!user) return res.status(404).send("User not found");
        
        try {
            // Get decrypted refresh token
            const decryptedTokens = user.decryptedTokens;
            
            // Attempt to revoke the token
            await oAuth2Client.revokeToken(decryptedTokens.refresh_token);
        } catch (revokeError) {
            console.log("Error revoking token:", revokeError);
            // Continue with user deletion even if token revocation fails
        }
    
        // Delete the user from database
        await User.deleteOne({ email: email });
    
        res.status(200).send('Access revoked successfully');
    } catch (error) {
        console.log("Error revoking user: ", error);
        res.status(500).send("Error revoking user access");    
    }
})

module.exports = router;
