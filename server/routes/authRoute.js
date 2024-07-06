const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const User = require("../models/User");

require("dotenv").config();

const redirect_uris = [`${process.env.ORIGIN_PROD}/report`];

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirect_uris[0]
);

const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPE,
  include_granted_scopes: true,
});

router.get("/getAuthUrl", (req, res) => {
  res.status(200).send(authUrl);
});

router.post("/getToken", async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).send("Invalid Request");

  try {
    const { tokens } = await oAuth2Client.getToken(code);

    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const tokenInfo = await oAuth2Client.getTokenInfo(accessToken);
    const email = tokenInfo.email;

    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);

    let user = await User.findOne({ email: email });
    console.log("user ->  >>> ", user);
    // if user exist update tokens
    if (user) {
      user.access_token = accessToken;
      user.refresh_token = refreshToken;
      await user.save();
    } else {
      // create new user
      const userDocument = new User({
        email: email,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      await userDocument.save();
    }

    res.status(200).send({ email: email, msg: "Authentication successfull" });
  } catch (error) {
    console.log("error", error);
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

  oAuth2Client.setCredentials({
    access_token: user.access_token,
    refresh_token: user.refresh_token,
  });

  try {
    // const q = `visibility='anyoneWithLink' and '${email}' in owners`;
    // const publicFiles = await drive.files.list({
    //     q: `visibility='anyoneWithLink' and '${email}' in owners`,
    //     fields: "files(id, name, mimeType, owners, permissions)",
    // })

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

    let publicFilesCount = 0;
    let sharedWithMultiplePeopleCount = 0;
    let filesOwnedByOthersCount = 0;

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

        // if(file.isPublic) publicFilesCount++;
        // else if(file.shared > 1) sharedWithMultiplePeopleCount++;
        // else if(file.sharedtome) filesOwnedByOthersCount++;
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

router.post("/revokeaccess", async (req, res) => {
    try {
        const email = req.query.email;
        google.accounts.id.revoke(email, done => console.log('Consent revoked'));
    
        await User.deleteOne({ email: email });
    
        res.status(200).send('Revoked successfully');
    } catch (error) {
        console.log("Error revocing user: ", error);
        res.status(500).send("Error revocing user");    
    }
})

module.exports = router;
