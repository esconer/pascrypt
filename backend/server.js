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
  const encryptedText = await encrypt(master, text);
  res.send(encryptedText);
});
app.post("/decrypt", async (req, res) => {
  const { master, text } = req.body;
  const decryptedText = await decrypt(master, text);
  res.send(decryptedText);
});
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
