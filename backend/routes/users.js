const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

const handleError = (res, status, message, error) =>
  res.status(status).json({ message, error: error?.message });

// Đăng ký route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    if (await usersCollection.findOne({ email }))
      return handleError(res, 400, "Người dùng đã tồn tại");

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Người dùng đã được tạo thành công",
      userId: result.insertedId,
      username,
    });
  } catch (error) {
    handleError(res, 500, "Lỗi khi đăng ký người dùng", error);
  }
});

// Đăng nhập route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectDb();
    const user = await db.collection("users").findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return handleError(res, 400, "Thông tin đăng nhập không hợp lệ");

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token, user: { username: user.username } });
  } catch (error) {
    handleError(res, 500, "Lỗi khi đăng nhập", error);
  }
});

// Lấy tất cả người dùng
router.get("/", async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, 500, "Lỗi khi lấy danh sách người dùng", error);
  }
});

// Lấy người dùng theo ID
router.get("/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne(
      { _id: new ObjectId(req.params.id) },
      { projection: { password: 0 } }
    );
    user
      ? res.status(200).json(user)
      : handleError(res, 404, "Người dùng không tìm thấy");
  } catch (error) {
    handleError(res, 500, "Lỗi khi lấy thông tin người dùng", error);
  }
});

// Cập nhật người dùng theo ID
router.put("/:id", async (req, res) => {
  const { currentPassword, newPassword, ...updates } = req.body;
  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!user) return handleError(res, 404, "Người dùng không tìm thấy");

    if (currentPassword && newPassword) {
      if (!(await bcrypt.compare(currentPassword, user.password)))
        return handleError(res, 400, "Mật khẩu hiện tại không đúng");

      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );
    res.status(200).json({
      message: result.modifiedCount
        ? "Người dùng đã được cập nhật thành công"
        : "Không có thay đổi nào được thực hiện",
    });
  } catch (error) {
    handleError(res, 500, "Lỗi khi cập nhật người dùng", error);
  }
});

// Xóa người dùng theo ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection("users");
    const result = await usersCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    result.deletedCount
      ? res.status(200).json({ message: "Bạn đã xóa tài khoản thành công!!" })
      : handleError(res, 404, "Người dùng không tìm thấy");
  } catch (error) {
    handleError(res, 500, "Lỗi khi xóa người dùng", error);
  }
});

module.exports = router;
