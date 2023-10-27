// import express from "express";
// import cors from "cors";
// import { encrypt, decrypt } from "./encryption.js";

const express = require("express");
const { encrypt, decrypt } = require("./encryption.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.send("hello world");
});

app.post("/encrypt", async (req, res) => {
  const { master, text } = req.body;
  console.log(master, text);
  const encryptedText = await encrypt(master, text);
  if (encryptedText) {
    res.send(encryptedText);
  } else {
    res.send("something wrong").status(404);
  }

  console.log(`encryption text is:   ${encryptedText}`);
});

app.post("/decrypt", async (req, res) => {
  const { master, text } = req.body;
  console.log(master, text);

  const decryptedText = await decrypt(master, text);

  if (decryptedText) {
    res.send(decryptedText);
  } else {
    res.send("something wrong").status(404);
  }

  console.log(`decryption text is:   ${decryptedText}`);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
