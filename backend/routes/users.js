var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

// Registration route
router.post("/register", async function (req, res) {
  const { username, email, password } = req.body;
  const db = await connectDb();
  const usersCollection = db.collection("users");

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  const result = await usersCollection.insertOne(newUser);
  res.status(201).json({
    message: "User created successfully",
    userId: result.insertedId,
    username: username,
  });
});

// Login route
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const db = await connectDb();
  const usersCollection = db.collection("users");

  // Find user
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create and send JWT token
  const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.json({ token, user: { username: user.username } });
});

module.exports = router;
