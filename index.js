const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models");

const app = express();

app.use(express.json());

// connect to mongoose using docker-compose service name:db
mongoose.connect("mongodb://db:27017/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all tasks using mongoose
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get a specific task by ID using mongoose
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      //send error message if task is not found
      res.status(404).json({ error: "Task not found" });
    });
});

// Create a new task using mongoose fields: title, description, status
app.post("/tasks", async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new Task({ title, description, status });
  const savedTask = await newTask.save();

  res.json(savedTask);
});

// Update a task by ID using mongoose
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, status },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(updatedTask);
});

// Delete a task by ID using mongoose
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(deletedTask);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
