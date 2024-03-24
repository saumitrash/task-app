const request = require("supertest");
const express = require("express");
const User = require("../models/User"); // update the path to your User model
const Task = require("../models/Task"); // update the path to your Task model
const taskRoutes = require("../routes/taskRoutes");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Task Routes", () => {
  let server;
  let user;
  let token;
  let task;

  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use("/tasks", taskRoutes);

    // Create a mock user
    user = new User({ username: "testUserNew2", password: "testPasswordNew2" });
    await user.save();

    token = await user.generateAuthToken();

    // Create a mock task
    task = new Task({
      title: "Test Task",
      userId: user._id,
      description: "Test Description",
      status: "To Do",
    });
    await task.save();

    // push task to user list
    user.tasks.push(task._id);
    await user.save();
  });

  it("should return 200 and the user tasks for authenticated user", async () => {
    const res = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("title", "Test Task");
  });

  it("should return 200 and the task with ID for authenticated user", async () => {
    const res = await request(server)
      .get(`/tasks/${task._id.toString()}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Test Task");
  });

  it("should create a new task for authenticated user", async () => {
    const res = await request(server)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New Task 2",
        description: "Test Description 2",
        status: "In Progress",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "New Task 2");
    expect(res.body).toHaveProperty("status", "In Progress");
  });

  it("should update a task for authenticated user", async () => {
    const res = await request(server)
      .put(`/tasks/${task._id.toString()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Task",
        description: "Test Description",
        status: "Done",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Task");
  });

  it("should delete a task for authenticated user", async () => {
    const res = await request(server)
      .delete(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", task._id.toString());
  });
});
