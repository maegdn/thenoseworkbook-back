const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

const User = require("../models/User");

// Retrieve users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const token = uid2(32);
  console.log("Body reçu :", req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    token
  });
  const saved = await newUser.save();
  res.status(201).json(saved);
});

router.get("/checkuser", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are incorrect" });
  }
  // Existing user check
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }
  // Password comp check
  const matchingPassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!matchingPassword) {
    return res.status(401).json({ error: "Invalid password." });
  }
  // Generate token
  const token = uid2(32);
  // Update user token
  existingUser.token = token;
  await existingUser.save();

  //send cookie
  res.cookie("token", existingUser.token, {
    httpOnly: true,
    secure: false, // set back to true when out of dev
    sameSite: "strict"
  });

  // Send response
  res.status(200).json({
    message: "Login successful",
    user: {
      name: existingUser.name,
      email: existingUser.email,
      token: existingUser.token
    }
  });
  console.log("User logged in:", existingUser.name);
});

module.exports = router;
