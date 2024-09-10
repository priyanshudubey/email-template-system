const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users"); // Import user routes
const signupRoutes = require("./routes/users");
const templateRoutes = require("./routes/templates");
const templateParserRoutes = require("./routes/templateRoutes");

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); // Middleware for JSON body parsing
app.use(express.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // Adjust if needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

// Route for user authentication
app.use("/api/users", userRoutes);
app.use(signupRoutes);
app.use("/templates", templateRoutes);
app.use("/api/templates", templateParserRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace for debugging
  res.status(500).json({ message: "Server error", error: err });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
