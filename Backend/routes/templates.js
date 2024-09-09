const express = require("express");
const { Template, User } = require("../db");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// Create a new template
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { subject, email } = req.body;
    const user_id = req.user.id;
    if (!subject || !email) {
      return res
        .status(400)
        .json({ message: "Subject and email are required" });
    }
    console.log("Subject: ", subject);
    console.log("Email: ", email);
    console.log("userId: ", user_id);

    const newTemplate = await Template.create({ user_id, subject, email });
    console.log("After template create: ", newTemplate);

    res.status(201).json(newTemplate);
  } catch (error) {
    console.error("Error during Template.create:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all templates for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const templates = await Template.findAll({ where: { user_id } });

    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a template
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, email } = req.body;
    const userId = req.user.id;

    const template = await Template.findOne({ where: { id, userId } });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    template.subject = subject;
    template.email = email;
    await template.save();

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a template
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const template = await Template.findOne({ where: { id, user_id } });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    await template.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
