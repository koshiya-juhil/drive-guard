const CryptoJS = require('crypto-js');
require('dotenv').config();

// Get encryption key from environment variables or use a default (only for development)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // For AES, this is always 16 bytes

/**
 * Encrypt sensitive data like tokens
 * @param {string} text - Plain text to encrypt
 * @returns {string} Encrypted text with IV prepended (format: "iv:encryptedData")
 */
const encrypt = (text) => {
  try {
    // Generate a random IV for each encryption
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    
    // Encrypt the text using AES-256-CBC with the key and IV
    const encrypted = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Combine IV and encrypted data, both as hex strings
    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypt sensitive data like tokens
 * @param {string} encryptedText - Encrypted text with IV (format: "iv:encryptedData")
 * @returns {string} Decrypted text
 */
const decrypt = (encryptedText) => {
  try {
    // Split the IV and encrypted data
    const textParts = encryptedText.split(':');
    const ivHex = textParts[0];
    const encryptedData = textParts[1];
    
    // Convert IV from hex to WordArray
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    
    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Convert the decrypted data to UTF-8 string
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

module.exports = {
  encrypt,
  decrypt
}; 