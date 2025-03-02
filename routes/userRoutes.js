const express = require("express");
const userController = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/", protect, isAdmin, userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.delete("/:id", protect, isAdmin, userController.deleteUser);

module.exports = router;
