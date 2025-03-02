const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Quiz = require("./Quiz");

const UserAttempt = sequelize.define(
  "UserAttempt",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("completed", "in-progress", "failed"),
      defaultValue: "in-progress",
    },
  },
  {
    tableName: "user_attempts",
    timestamps: true,
  }
);

// Define the relationships
User.hasMany(UserAttempt, { foreignKey: "userId", onDelete: "CASCADE" });
UserAttempt.belongsTo(User, { foreignKey: "userId" });

Quiz.hasMany(UserAttempt, { foreignKey: "quizId", onDelete: "CASCADE" });
UserAttempt.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = UserAttempt;
