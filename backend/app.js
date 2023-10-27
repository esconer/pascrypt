const readline = require("readline");
const { encrypt, decrypt } = require("./encryption.js");
// const { encrypt, decrypt } = require("./encryptcode");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function encryptText() {
  rl.question("Enter the password: ", (password) => {
    rl.question("Enter the text to encrypt: ", (plaintext) => {
      try {
        const cipherText = encrypt(password, plaintext);
        console.log(`Encrypted Text: ${cipherText}`);
      } catch (error) {
        console.error("Encryption error:", error.message);
      }
      rl.close();
    });
  });
}

function decryptText() {
  rl.question("Enter the password: ", (password) => {
    rl.question("Enter the Base64-encoded cipher text: ", (cipherText) => {
      try {
        const decryptedText = decrypt(password, cipherText);
        console.log(`Decrypted Text: ${decryptedText}`);
      } catch (error) {
        console.error("Decryption error:", error.message);
      }
      rl.close();
    });
  });
}

function menu() {
  rl.question(
    "Choose an option:\n1. Encrypt\n2. Decrypt\n\nEnter your choice (1 or 2): ",
    (choice) => {
      switch (choice) {
        case "1":
          encryptText();
          break;
        case "2":
          decryptText();
          break;
        default:
          console.log("Invalid choice. Exiting...");
          rl.close();
          break;
      }
    }
  );
}

console.log("Welcome to Text Encryption/Decryption App!\n");
menu();
