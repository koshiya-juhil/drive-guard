const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Pre-save middleware to encrypt tokens before saving to database
userSchema.pre('save', function(next) {
    // Only encrypt if tokens are modified or it's a new document
    if (this.isModified('access_token') || this.isNew) {
        this.access_token = encrypt(this.access_token);
    }
    
    if (this.isModified('refresh_token') || this.isNew) {
        this.refresh_token = encrypt(this.refresh_token);
    }
    
    next();
});

// Method to get decrypted access token
userSchema.methods.getDecryptedAccessToken = function() {
    return decrypt(this.access_token);
};

// Method to get decrypted refresh token
userSchema.methods.getDecryptedRefreshToken = function() {
    return decrypt(this.refresh_token);
};

// Virtual property to get both decrypted tokens
userSchema.virtual('decryptedTokens').get(function() {
    return {
        access_token: this.getDecryptedAccessToken(),
        refresh_token: this.getDecryptedRefreshToken()
    };
});

const User = mongoose.model('Users', userSchema);
module.exports = User;