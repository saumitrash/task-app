const express = require("express");
const app = express();

app.use(express.json());

// Array to store tasks
let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a specific task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const { id, title, description } = req.body;

  if (!id || !title || !description) {
    return res.status(400).json({ error: "Invalid task data" });
  }

  const newTask = { id, title, description };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = { ...tasks[taskIndex], title, description };
  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json(deletedTask);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
