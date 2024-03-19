const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../User");

const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    // Get the user data from the request body
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = new User({ username, password: password });

    // Return a success response
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "An error occurred" });
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
    const token = jwt.sign({ userId: user.id }, "your-secret-key");

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
