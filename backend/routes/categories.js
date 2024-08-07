var express = require("express");
var router = express.Router();

// Import model
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

//Lấy tất cả danh mục dạng json
router.get("/", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("categories");
  const categories = await productCollection.find().toArray();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

//Lấy danh mục theo id
router.get("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("categories");
  const categories = await productCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

//Lấy danh sách sản phẩm theo categoryId
router.get("/byCategory/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection
    .find({ categoryId: new ObjectId(req.params.id) })
    .toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

//Top 10 sản phẩm đánh giá tốt nhất
router.get("/topRating", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection
    .find()
    .sort({ rating: -1 })
    .limit(10)
    .toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

module.exports = router;
