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

// Get a single template by ID
router.get("/:id", authenticateToken, async (req, res) => {
  console.log("User ID from token:", req.user.id);
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    console.log("Fetching template with ID:", id); // Log for debugging

    const template = await Template.findOne({ where: { id, user_id } });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
//Update the template
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, email } = req.body;
    const userId = req.user.id;
    // Validate request body
    if (!subject || !email) {
      return res
        .status(400)
        .json({ message: "Subject and email are required." });
    }
    console.log("Fetching template with ID:", id, "and userId:", userId);

    // Fetch the template by id and user_id
    const template = await Template.findOne({ where: { id, user_id: userId } });
    console.log("Template fetched:", template);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Update template fields
    template.subject = subject;
    template.email = email;

    console.log("Updating template:", template);

    // Save the updated template
    await template.save();

    console.log("Template updated:", template);

    res.json(template);
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get a single template by ID
// router.get("/:id", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user_id = req.user.id;

//     // Fetch template by ID for the logged-in user
//     const template = await Template.findOne({ where: { id, user_id } });

//     if (!template) {
//       return res.status(404).json({ message: "Template not found" });
//     }

//     res.json(template);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

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
