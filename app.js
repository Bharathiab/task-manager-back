// backend/app.js
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

module.exports = app; // export app for serverless & local server
