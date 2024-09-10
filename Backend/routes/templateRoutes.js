const express = require("express");
const mustache = require("mustache");
const { Template } = require("../db");

const router = express.Router();

// Endpoint to extract sections and placeholders from a specific template
router.get("/template-details", async (req, res) => {
  try {
    const templateId = req.query.templateId;
    if (!templateId) {
      return res.status(400).json({ message: "Template ID is required" });
    }

    const template = await Template.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const templateContent = template.email;
    console.log("Template Content:", templateContent); // Debugging statement

    const data = {
      sections: [],
      placeholders: [],
    };

    const sectionRegex = /{{#(.+?)}}/g;
    const sectionMatches = [...templateContent.matchAll(sectionRegex)];
    for (const match of sectionMatches) {
      data.sections.push(match[1]);
    }

    const placeholderRegex = /{{{(.+?)}}}/g;
    const placeholderMatches = [...templateContent.matchAll(placeholderRegex)];
    for (const match of placeholderMatches) {
      data.placeholders.push(match[1]);
    }

    console.log("Sections:", data.sections); // Debugging statement
    console.log("Placeholders:", data.placeholders); // Debugging statement

    res.json(data);
  } catch (error) {
    console.error("Error fetching template details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to parse a template with provided form data
router.post("/parse-template", (req, res) => {
  try {
    const { templateContent, formData } = req.body;

    if (!templateContent || !formData) {
      console.log("Invalid request body");
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Render the template with Mustache
    const parsedTemplate = mustache.render(templateContent, formData);
    res.json({ parsedContent: parsedTemplate });
  } catch (error) {
    console.error("Error parsing template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
