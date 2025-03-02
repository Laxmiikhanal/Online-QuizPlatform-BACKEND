const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to verify JWT token
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware for Admin role check
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, Admins only" });
  }
  next();
};

module.exports = { protect, isAdmin };
