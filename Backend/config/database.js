const { Sequelize } = require("sequelize");
const config = require("./config");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: "mysql",
    logging: console.log,
  }
);
console.log("Databse name: ", config.database.name);

// Function to test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;
