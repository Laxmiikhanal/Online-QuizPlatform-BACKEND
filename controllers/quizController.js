const Quiz = require("../models/Quiz");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, createdBy } = req.body;

    // Validate required fields
    if (!title || !category || !createdBy) {
      return res.status(400).json({ message: "Title, category, and createdBy are required" });
    }

    const quiz = await Quiz.create({ title, description, category, difficulty, createdBy });
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};

// Get quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error: error.message });
  }
};

// Update quiz
const updateQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty } = req.body;
    const quiz = await Quiz.findByPk(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    await quiz.update({ title, description, category, difficulty });
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error: error.message });
  }
};

// Delete quiz
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    await quiz.destroy();
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error: error.message });
  }
};

module.exports = { createQuiz, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz };
