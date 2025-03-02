const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ensure you have a database connection file

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Auto-increment primary key
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // Defines user roles
      defaultValue: "user",
    },
  },
  {
    tableName: "users", // Explicit table name
    timestamps: true, // Enables createdAt & updatedAt
  }
);

module.exports = User;
