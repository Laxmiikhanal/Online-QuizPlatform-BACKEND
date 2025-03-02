const express = require("express");
const userAttemptController= require("../controllers/userAttemptController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", userAttemptController.getAllUserAttempts);
router.get("/user/:userId", userAttemptController.getUserAttemptsByUserId);
router.get("/quiz/:quizId", userAttemptController.getUserAttemptsByQuizId);

// Protected Routes (Only logged-in users can start/submit attempts)
router.post("/", protect, userAttemptController.startQuizAttempt);
router.put("/submit", protect, userAttemptController.submitQuizAttempt);
router.delete("/:id", protect, isAdmin, userAttemptController.deleteUserAttempt);

module.exports = router;
