const sequelize = require("./config/database"); // Import the Sequelize instance from database.js
const User = require("./models/User"); // Import the User model
const Template = require("./models/Templates");

const db = {
  sequelize,
  User,
  Template,
};

module.exports = db;
