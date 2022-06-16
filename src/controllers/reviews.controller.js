const Review = require("../models/reviews.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // const productId = await Category.find({ name: category }).lean().exec();

    const reviews = await Review.find({})
      .sort({ sort: value })
      .populate("category_id")
      .limit(prodPerPage)
      .skip(page * prodPerPage)
      .lean()
      .exec();

    const review = await Review.find()
      .populate("product_id")
      .populate("user_id")
      .lean()
      .exec();
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("product_id")
      .populate("user_id")
      .lean()
      .exec();
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const review = await Review.find({ product_id: req.params.id })
      .populate("product_id")
      .populate("user_id")
      .lean()
      .exec();
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
