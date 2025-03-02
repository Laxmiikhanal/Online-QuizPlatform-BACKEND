const express = require("express");
const questionController = require("../controllers/questionController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.get("/quiz/:quizId", questionController.getQuestionsByQuiz);

// Protected Routes (Only logged-in users can create/update/delete questions)
router.post("/", protect, questionController.createQuestion);
router.put("/:id", protect, questionController.updateQuestion);
router.delete("/:id", protect, isAdmin, questionController.deleteQuestion);

module.exports = router;
