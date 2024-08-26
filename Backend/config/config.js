const dotenv = require("dotenv");
const path = require("path");

const res = dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (res.error) {
  console.error("Error loading environment variables:", res.error);
} else {
  console.log("Environment variables loaded successfully.");
}

const config = {
  database: {
    host: process.env.REACT_APP_DB_HOST,
    name: process.env.REACT_APP_DB_NAME,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    dialect: "mysql",
  },
  server: {
    port: process.env.REACT_APP_PORT || 5000,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },
};
console.log(config.database.host);

module.exports = config;
