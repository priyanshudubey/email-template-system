const express = require("express");
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
require("dotenv").config();
const { htmlToText } = require("html-to-text");

const router = express.Router();

const TOKEN = process.env.MAILTRAP_TOKEN;
const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: process.env.MAILTRAP_INBOX_ID,
  })
);

// API route to send email
router.post("/send-email", async (req, res) => {
  const { senderName, senderAddress, recipients, subject, text } = req.body;
  console.log(req.body);

  if (!recipients || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const plainText = htmlToText(text, {
    wordwrap: 130, // Optionally wrap text for better readability
  });

  try {
    const sender = {
      address: senderAddress || "info@etemp.com",
      name: senderName || "E-Temp Store",
    };

    // Sending the email
    const result = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: subject,
      text: plainText,
      category: "Integration Test",
      sandbox: true,
      html: text,
    });

    console.log(result);
    res.status(200).json({ message: "Email sent successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email", details: error });
  }
});

module.exports = router;
