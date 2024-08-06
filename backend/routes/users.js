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

// Get all users
router.get("/", async function (req, res) {
  const db = await connectDb();
  const usersCollection = db.collection("users");

  try {
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// Get user by ID
router.get("/:id", async function (req, res) {
  const db = await connectDb();
  const usersCollection = db.collection("users");

  try {
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.params.id) },
      { projection: { password: 0 } }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

router.put("/:id", async function (req, res) {
  const db = await connectDb();
  const usersCollection = db.collection("users");
  const userId = req.params.id;
  const { currentPassword, newPassword, ...updates } = req.body;

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes were made" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// Delete user by ID
router.delete("/:id", async function (req, res) {
  const db = await connectDb();
  const usersCollection = db.collection("users");

  try {
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Bạn đã xóa tài khoản thành công!!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
