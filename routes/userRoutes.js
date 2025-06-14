const express = require("express");
const router = express.Router();

const User = require("../models/User");
// const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  const saved = await newUser.save();
  res.status(201).json(saved);
});

module.exports = router;
