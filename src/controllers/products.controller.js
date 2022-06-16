const Product = require("../models/products.model");
const Category = require("../models/category.model");
const express = require("express");
const ReviewsModel = require("../models/reviews.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 1;
    let prodPerPage = req.query.size || 8;
    // let filter = req.query.filter;
    let sort = req.query.sort || "asc";
    let category = req.query.category;
    let count = null;
    let value = null;
    if (sort === "asc") {
      value = 1;
    } else if (sort === "dsc") {
      value = -1;
    }

    // sort

    if (sort && !category) {
      let dataCount = await Product.countDocuments({});
      count = Math.ceil(dataCount / prodPerPage) - page - 1;

      const product = await Product.find()
        .sort({ sort: value })
        .populate("category_id")
        .limit(prodPerPage)
        .skip(page * prodPerPage)
        .lean()
        .exec();

      return res.send({ product, count });
    }

    if (category && !sort) {
      let dataCount = await Product.countDocuments({});
      count = Math.ceil(dataCount / prodPerPage) - page - 1;

      const categoryId = await Category.find({ name: category }).lean().exec();

      const product = await Product.find({ category_id: categoryId })
        .sort({ sort: value })
        .populate("category_id")
        .limit(prodPerPage)
        .skip(page * prodPerPage)
        .lean()
        .exec();

      // const filteredData = product.filter((item) => {
      //   return item.category_id.name.toLowerCase() === query.toLowerCase();
      // });
      return res.send({ product, count });
    }

    // category and sort
    else if (category && sort) {
      let dataCount = await Product.countDocuments({});
      count = Math.ceil(dataCount / prodPerPage) - page - 1;

      const categoryId = await Category.find({ name: category }).lean().exec();

      const product = await Product.find({ category_id: categoryId })
        .sort({ sort: value })
        .populate("category_id")
        .limit(prodPerPage)
        .skip(page * prodPerPage)
        .lean()
        .exec();

      const filteredData = product.filter((item) => {
        return item.category_id.name.toLowerCase() === category.toLowerCase();
      });
      return res.send({ filteredData, count });
    } else {
      let dataCount = await Product.countDocuments({});
      count = Math.ceil(dataCount / prodPerPage) - page - 1;

      const product = await Product.find()
        .sort()
        .populate("category_id")
        .limit(prodPerPage)
        .skip(page * prodPerPage)
        .lean()
        .exec();

      return res.send({ product, count });
    }
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id")
      .lean()
      .exec();
    const reviews = await ReviewsModel.aggregate().match({
      product_id: req.params.id,
    });
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
