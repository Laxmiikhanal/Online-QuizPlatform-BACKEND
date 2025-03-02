// Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const userAttemptRoutes = require("./routes/userAttemptRoutes");

// Import models to ensure they are registered
const User = require("./models/User");
const Quiz = require("./models/Quiz");
const Question = require("./models/Question");
const UserAttempt = require("./models/userAttempt");

// Creating a Server
const app = express();

// Creating a port
const PORT = process.env.PORT || 5000;

// Creating middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.send("Welcome to the web page");
});

// Routes
app.use('/users', userRoutes);
app.use('/quiz', quizRoutes);
app.use('/questions', questionRoutes);
app.use('/userAttempts', userAttemptRoutes);

// Sync Sequelize models with the database
sequelize.sync({ force: false }) // Set `force: true` to drop and recreate tables (only for dev)
    .then(() => {
        console.log("Database & tables synced successfully!..............");
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

// Running on PORT
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}.........................`);
});
