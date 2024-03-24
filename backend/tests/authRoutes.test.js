const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User"); // update the path to your User model
const router = require("../routes/authRoutes"); // update the path to your routes file

const app = express();
app.use(express.json());
app.use("/auth", router);

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

describe("Test /register endpoint", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User registered successfully");

    const user = await User.findOne({ username: "testuser" });
    expect(user).not.toBeNull();
  });

  it("should not create a user with the same username", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Username already in use");
  });
});

describe("POST /auth/login", () => {
  it("should fail when username is empty", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "", password: "password" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "error",
      "Username and password are required"
    );
  });

  it("should fail when password is empty", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "username", password: "" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "error",
      "Username and password are required"
    );
  });

  it("should fail when username and password are empty", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "", password: "" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "error",
      "Username and password are required"
    );
  });

  it("should login successfully with correct credentials", async () => {
    const username = "testUser";
    const password = "testPassword";

    // Create a user
    const user = new User({ username, password });
    await user.save();

    // Test the login endpoint
    const res = await request(app)
      .post("/auth/login")
      .send({ username, password });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail to login with incorrect credentials", async () => {
    const username = "testUser";
    const password = "wrongPassword";

    // Test the login endpoint with wrong password
    const res = await request(app)
      .post("/auth/login")
      .send({ username, password });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });
});

describe("POST /auth/logout", () => {
  it("should logout successfully", async () => {
    const username = "testUser1";
    const password = "testPassword1";

    // Create a user
    const user = new User({ username, password });
    await user.save();

    // Login to get the token
    const loginRes = await request(app)
      .post("/auth/login")
      .send({ username, password });

    const token = loginRes.body.token;

    // Test the logout endpoint
    const res = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });

  it("should fail to logout when token is invalid", async () => {
    const token = jwt.sign({ _id: "someid" }, "your_secret_key");
    const res = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });
});

describe("authMiddleware", () => {
  let server;
  let token;
  let user;
  beforeAll(async () => {
    server = express();
    server.use(express.json());
    server.use("/dummy", authMiddleware, (req, res) => {
      res.status(200).json({ message: "Protected resource" });
    });

    // Create a mock user
    user = new User({
      username: "testUserNew",
      password: "testPasswordNew",
    });
    token = await user.generateAuthToken();
    await user.save();
  });

  it("should return 200 for authenticated user", async () => {
    const res = await request(server)
      .get("/dummy")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Protected resource");
  });

  it("should return 401 for unauthenticated user", async () => {
    const res = await request(server)
      .get("/dummy")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toEqual(401);
  });
});
