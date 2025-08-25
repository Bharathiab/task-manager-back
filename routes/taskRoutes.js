const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks?status=completed or status=pending
router.get("/", protect, getTasks);

// Create a new task
router.post("/", protect, createTask);

// Update a task by ID
router.put("/:id", protect, updateTask);

// Delete a task by ID
router.delete("/:id", protect, deleteTask);

module.exports = router;
