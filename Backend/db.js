const sequelize = require("./config/database"); // Import the Sequelize instance from database.js
const User = require("./models/User"); // Import the User model

const db = {
  sequelize,
  User,
};

module.exports = db;
