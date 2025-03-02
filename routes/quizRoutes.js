const express = require("express");
const quizController = require("../controllers/quizController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", quizController.getAllQuizzes);
router.get("/:id", quizController.getQuizById);

// Protected Routes (only authenticated users can create/update/delete quizzes)
router.post("/", protect, quizController.createQuiz);
router.put("/:id", protect, quizController.updateQuiz);
router.delete("/:id", protect, isAdmin, quizController.deleteQuiz);

module.exports = router;
