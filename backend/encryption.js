// const crypto = require("crypto");
const crypto = require("crypto");

const AES_MODE = "aes-256-cbc";
const ENCODING = "utf-8";

const HASH_ALGORITHM = "sha256";
const SALT = "d68a1c8a0a8b8710f7c771065165867fc8e73b50ee6809a7e9f53873b38e3e0d";

const ivBytes = Buffer.from([
  0x42, 0x59, 0xaf, 0x51, 0xff, 0xb3, 0x02, 0x68, 0x62, 0xce, 0xda, 0x11, 0x00,
  0xe9, 0x44, 0x01,
]);

function generateKey(password) {
  const saltedPassword = password + SALT;
  const key = crypto
    .createHash(HASH_ALGORITHM)
    .update(saltedPassword, ENCODING)
    .digest();
  return key;
}

function encrypt(password, message) {
  const key = generateKey(password);

  const cipher = crypto.createCipheriv(AES_MODE, key, ivBytes);
  let cipherText = cipher.update(message, ENCODING, "base64");
  cipherText += cipher.final("base64");

  return cipherText;
}

function decrypt(password, base64EncodedCipherText) {
  const key = generateKey(password);

  const decipher = crypto.createDecipheriv(AES_MODE, key, ivBytes);
  let decryptedText = decipher.update(
    base64EncodedCipherText,
    "base64",
    ENCODING
  );
  decryptedText += decipher.final(ENCODING);

  return decryptedText;
}

module.exports = {
  encrypt,
  decrypt,
};
