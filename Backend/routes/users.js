// Backend/routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const router = express.Router();
const config = require("../config/config");
const cors = require("cors");
const authenticateToken = require("../middleware/authenticateToken");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

router.use(cors(corsOptions));

router.post("/signup", async (req, res) => {
  console.log("Inside signup");
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    // console.log("existing");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // console.log("before hashing");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    // console.log("new: ", newUser);

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
      config.jwt.secret,
      { expiresIn: "1h" }
    );

    // Send token and username
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get User Profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["name", "id", "username", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Fetched user:", user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update User Profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, username, email, password } = req.body;

    const updateData = { name, username, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const [updatedRowsCount, updatedRows] = await User.update(updateData, {
      where: { id: userId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
