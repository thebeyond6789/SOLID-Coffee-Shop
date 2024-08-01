var express = require("express");
var router = express.Router();

//Import model
const connectDb = require("../models/db");
const { ObjectId } = require("mongodb");

const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

function checkFileUpload(req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return callback(new Error("Định dạng file không hợp lệ!"));
  } else {
    callback(null, true);
  }
}

let upload = multer({
  storage: storage,
  fileFilter: checkFileUpload,
  limits: { fileSize: 50 * 1024 * 1024 }, // byte
});

//Lấy tất cả sản phẩm dạng json
router.get("/", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const products = await productCollection.find().toArray();

  const categoryCollection = db.collection("categories");
  const categories = await categoryCollection.find().toArray();

  if (products) {
    products.map((item) => {
      category = categories.find(
        (cate) => cate._id.toString() == item.categoryId.toString()
      );
      item.category = category;
      return item;
    });
    console.log(products);
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

//Lấy sản phẩm theo id
router.get("/id/:id", async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
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

router.post("/", upload.single("image"), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection("products");
  const newProduct = {
    _id: null,
    name: req.body.name,
    description: req.body.description,
    categoryId: new ObjectId(req.body.categoryId),
    price: req.body.price,
    image: req.file.originalname,
    rating: 0,
  };
  const product = await productCollection.insertOne(newProduct);
  if (product.insertedId) {
    res.status(200).json({ message: "Thêm sản phẩm thành công!" });
  } else {
    res.status(404).json({ message: "Không tìm thấy" });
  }
});

module.exports = router;
