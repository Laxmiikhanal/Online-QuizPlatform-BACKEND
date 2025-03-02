const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Quiz = require("./Quiz");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    optionA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.ENUM("A", "B", "C", "D"),
      allowNull: false,
    },
  },
  {
    tableName: "questions",
    timestamps: true,
  }
);

// Define the relationship
Quiz.hasMany(Question, { foreignKey: "quizId", onDelete: "CASCADE" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = Question;
