// Backend/routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const router = express.Router();
const config = require("../config/config");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Adjust if needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

router.use(cors(corsOptions));

router.post("/signup", async (req, res) => {
  console.log("Inside signup");
  try {
    const { username, email, password } = req.body;
    console.log(
      "Username: ",
      username,
      " - Email: ",
      email,
      " - password: ",
      password
    );
    const existingUser = await User.findOne({ where: { email } });
    console.log("existing");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("before hashing");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("new: ", newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret, // Use the secret key from config
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
