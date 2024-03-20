const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Save the user to the database
    const newUser = new User({ username, password });
    await newUser.save();

    // Return a success response
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password } = req.body;

    // Retrieve the user from the database
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = await user.generateAuthToken();

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await user.save();

    res.send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
