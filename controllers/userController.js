const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });
  
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });
  
      res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };
  

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get all users (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by ID (Protected Route)
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ["id", "name", "email", "role"] });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Delete user (Admin Only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserById, deleteUser };
