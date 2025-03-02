const Question = require("../models/Question");

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { quizId, text, optionA, optionB, optionC, optionD, correctAnswer } = req.body;

    if (!quizId || !text || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.create({
      quizId,
      text,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    });

    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error: error.message });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

// Get questions by Quiz ID
const getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.findAll({ where: { quizId } });

    if (!questions.length) return res.status(404).json({ message: "No questions found for this quiz" });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question", error: error.message });
  }
};

// Update a question
const updateQuestion = async (req, res) => {
  try {
    const { text, optionA, optionB, optionC, optionD, correctAnswer } = req.body;
    const question = await Question.findByPk(req.params.id);

    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.update({ text, optionA, optionB, optionC, optionD, correctAnswer });
    res.status(200).json({ message: "Question updated successfully", question });
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.destroy();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionsByQuiz,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
