var express = require("express");
var router = express.Router();

// Import model
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

// Lấy tất cả đơn hàng dạng json
router.get("/", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("orders");
  const orders = await productCollection.find().toArray();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

// Lấy đơn hàng theo id
router.get("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("orders");
  const product = await productCollection.findOne({
    _id: new ObjectId(req.params.id),
  });

  const categoryCollection = db.collection("categories");
  const category = await categoryCollection.findOne({
    _id: new ObjectId(product.categoryId),
  });

  if (product) {
    product.category = category;
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

// Lấy danh sách đơn hàng theo categoryId
router.get("/byCategory/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("orders");
  const orders = await productCollection
    .find({ categoryId: new ObjectId(req.params.id) })
    .toArray();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

// Top 10 đơn hàng đánh giá tốt nhất
router.get("/topRating", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("orders");
  const orders = await productCollection
    .find()
    .sort({ rating: -1 })
    .limit(10)
    .toArray();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

// Thêm đơn hàng
router.post("/", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("orders");
  const data = req.body;
  const result = await productCollection.insertOne(data);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

module.exports = router;
