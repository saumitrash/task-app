const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.populate("tasks");
    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific task by ID using mongoose
router.get("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId; // Get the user ID from the auth middleware

  try {
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new task using mongoose fields: title, description, status
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new Task({
    title,
    description,
    status,
    userId: req.userId, // Add the user's ID to the task
  });

  const savedTask = await newTask.save();

  // Also add the task to the user's tasks
  const user = req.user;
  user.tasks.push(savedTask._id);
  await user.save();

  res.json(savedTask);
});

// Update a task by ID using mongoose
router.put("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId; // Get the user ID from the auth middleware
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a task by ID using mongoose
router.delete("/:id", authMiddleware, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId; // Get the user ID from the auth middleware

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Also remove the task from the user's tasks
    const user = req.user;
    const taskIndex = user.tasks.indexOf(taskId);
    if (taskIndex > -1) {
      user.tasks.splice(taskIndex, 1);
      await user.save();
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
