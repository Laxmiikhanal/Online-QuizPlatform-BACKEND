const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "medium",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "quizzes",
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = Quiz;
