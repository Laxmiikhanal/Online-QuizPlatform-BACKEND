const UserAttempt = require("../models/userAttempt");
const User = require("../models/User");
const Quiz = require("../models/Quiz");

// Create a new user attempt (Start a quiz)
const startQuizAttempt = async (req, res) => {
  try {
    const { userId, quizId, totalQuestions } = req.body;

    if (!userId || !quizId || !totalQuestions) {
      return res.status(400).json({ message: "User ID, Quiz ID, and total questions are required" });
    }

    const attempt = await UserAttempt.create({
      userId,
      quizId,
      totalQuestions,
      correctAnswers: 0,
      score: 0,
      status: "in-progress",
    });

    res.status(201).json({ message: "Quiz attempt started", attempt });
  } catch (error) {
    res.status(500).json({ message: "Error starting quiz attempt", error: error.message });
  }
};

// Get all user attempts
const getAllUserAttempts = async (req, res) => {
  try {
    const attempts = await UserAttempt.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Quiz, attributes: ["id", "title", "category"] },
      ],
    });

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user attempts", error: error.message });
  }
};

// Get attempts by User ID
const getUserAttemptsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const attempts = await UserAttempt.findAll({
      where: { userId },
      include: [{ model: Quiz, attributes: ["id", "title", "category"] }],
    });

    if (!attempts.length) return res.status(404).json({ message: "No attempts found for this user" });

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user attempts", error: error.message });
  }
};

// Get attempts by Quiz ID
const getUserAttemptsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    const attempts = await UserAttempt.findAll({
      where: { quizId },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    if (!attempts.length) return res.status(404).json({ message: "No attempts found for this quiz" });

    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz attempts", error: error.message });
  }
};

// Update a user attempt (Submit Quiz)
const submitQuizAttempt = async (req, res) => {
  try {
    const { attemptId, correctAnswers, score } = req.body;
    const attempt = await UserAttempt.findByPk(attemptId);

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    await attempt.update({
      correctAnswers,
      score,
      status: "completed",
    });

    res.status(200).json({ message: "Quiz attempt submitted successfully", attempt });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz attempt", error: error.message });
  }
};

// Delete a user attempt (Admin only)
const deleteUserAttempt = async (req, res) => {
  try {
    const attempt = await UserAttempt.findByPk(req.params.id);
    if (!attempt) return res.status(404).json({ message: "User attempt not found" });

    await attempt.destroy();
    res.status(200).json({ message: "User attempt deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user attempt", error: error.message });
  }
};

module.exports = {
  startQuizAttempt,
  getAllUserAttempts,
  getUserAttemptsByUserId,
  getUserAttemptsByQuizId,
  submitQuizAttempt,
  deleteUserAttempt,
};
