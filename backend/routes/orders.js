var express = require("express");
var router = express.Router();

// Import model
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

// Lấy tất cả đơn hàng
router.get("/", async (req, res, next) => {
  const db = await connectDb();
  const orderCollection = db.collection("orders");
  const orders = await orderCollection.find().toArray();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  }
});

// Lấy đơn hàng theo ID
router.get("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const orderCollection = db.collection("orders");
  const order = await orderCollection.findOne({
    _id: new ObjectId(req.params.id),
  });

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  }
});

// Thêm đơn hàng mới
router.post("/", async (req, res, next) => {
  const db = await connectDb();
  const orderCollection = db.collection("orders");
  const newOrder = {
    user: {
      fullname: req.body.fullname,
      phone: req.body.phone,
      address: req.body.address,
    },
    detail: req.body.detail,
    total_money: req.body.total_money,
  };

  const result = await orderCollection.insertOne(newOrder);
  if (result.insertedId) {
    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công",
      orderId: result.insertedId,
    });
  } else {
    res.status(500).json({ message: "Không thể tạo đơn hàng" });
  }
});

// Cập nhật đơn hàng
router.put("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const orderCollection = db.collection("orders");
  const orderId = req.params.id;
  const updatedOrder = {
    user: {
      fullname: req.body.fullname,
      phone: req.body.phone,
      address: req.body.address,
    },
    detail: req.body.detail,
    total_money: req.body.total_money,
  };

  try {
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updatedOrder }
    );

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Đơn hàng đã được cập nhật thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật đơn hàng", error: error.message });
  }
});

// Xóa đơn hàng (hoàn thành đơn)
router.delete("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const orderCollection = db.collection("orders");
  const orderId = req.params.id;

  try {
    const result = await orderCollection.deleteOne({
      _id: new ObjectId(orderId),
    });

    if (result.deletedCount > 0) {
      res
        .status(200)
        .json({ message: "Đơn hàng đã được xóa (hoàn thành) thành công!!" });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa đơn hàng", error: error.message });
  }
});

module.exports = router;
