const express = require("express");
const mustache = require("mustache");

const router = express.Router();

const template = `
  Hi {{{Receipient_Name}}},

  {{#WellNess}}
  blah blash blah
  {{/WellNess}}

  {{#ImportantMessage}}
  Just wanted to let you know that your classes are starting from {{{Start_Date}}}, and I want you to be present in the class.
  {{/ImportantMessage}}

  {{#Signature}}
  Regards,
  Priyanshu
  {{/Signature}}
`;

// Endpoint to extract sections and placeholders dynamically
router.get("/template-details", (req, res) => {
  const data = {
    sections: [],
    placeholders: [],
  };

  // Step 1: Find all sections (e.g., {{#Section}} ... {{/Section}})
  const sectionRegex = /{{#(.+?)}}/g;
  const sectionMatches = [...template.matchAll(sectionRegex)];
  for (const match of sectionMatches) {
    data.sections.push(match[1]); // Push section names
  }

  // Step 2: Find and prompt for all placeholders (e.g., {{{Placeholder}}})
  const placeholderRegex = /{{{(.+?)}}}/g;
  const placeholderMatches = [...template.matchAll(placeholderRegex)];
  for (const match of placeholderMatches) {
    data.placeholders.push(match[1]); // Push placeholder names
  }

  // Send sections and placeholders back to frontend
  res.json(data);
});

router.post("/parse-template", (req, res) => {
  const { templateContent, formData } = req.body;

  const parsedTemplate = mustache.render(templateContent, formData);

  res.json({ parsedContent: parsedTemplate });
});

module.exports = router;
