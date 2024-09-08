const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import sequelize instance

const Template = sequelize.define(
  "Template",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // name of the table you want to reference
        key: "id",
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "templates",
    timestamps: false,
  }
);

// Define relationships
const User = require("./User"); // Import User model

Template.belongsTo(User, { foreignKey: "user_id" });

module.exports = Template;
