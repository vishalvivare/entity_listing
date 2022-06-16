const Product = require("../models/index.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 0;
    let prodPerPage = req.query.size || 5;
    let filter = req.query.filter;
    let sort = req.query.sort;
    let dataCount = await Product.countDocuments({});
    let count = Math.ceil(dataCount / prodPerPage) - page - 1;
    let data = [];

    if (filter && !sort) {
      data = await Product.find({ category: filter })
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .lean()
        .exec();
    } else if (!filter && sort) {
      let value = null;
      if (sort === "asc") {
        value = 1;
      } else if (sort === "dsc") {
        value = -1;
      }
      data = await Product.find()
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .sort({ id: value })
        .lean()
        .exec();
    } else if (filter && sort) {
      let value = null;
      if (sort === "asc") {
        value = 1;
      } else if (sort === "dsc") {
        value = -1;
      }
      data = await Product.find({ category: filter })
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .sort({ id: value })
        .lean()
        .exec();
    } else if (!filter && !sort) {
      data = await Product.find()
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .lean()
        .exec();
    }
    res.send({ data, count });

    // if (!filter && !sort) {
    //   // not filter not sort
    //   const products = await Product.find()
    //     .skip(page * prodPerPage)
    //     .limit(prodPerPage)
    //     .lean()
    //     .exec();
    //   return res.send(products);
    // } else if (filter && !sort) {
    //   // filter but not sort
    //   const products = await Product.find({ category: filter })
    //     .skip(page * prodPerPage)
    //     .limit(prodPerPage)
    //     .lean()
    //     .exec();
    //   return res.send(products);
    // } else if (sort && filter) {
    //   // sort and filter
    //   let value = null;
    //   if (sort === "asc") {
    //     value = 1;
    //   } else if (sort === "dsc") {
    //     value = -1;
    //   }
    //   const products = await Product.find({ category: filter })
    //     .skip(page * prodPerPage)
    //     .limit(prodPerPage)
    //     .sort({ id: value })
    //     .lean()
    //     .exec();
    //   return res.send(products);
    // } else if (sort && !filter) {
    //   // sort but not filter
    //   let value = null;
    //   if (sort === "asc") {
    //     value = 1;
    //   } else if (sort === "dsc") {
    //     value = -1;
    //   }
    //   const products = await Product.find()
    //     .skip(page * prodPerPage)
    //     .limit(prodPerPage)
    //     .sort({ id: value })
    //     .lean()
    //     .exec();
    //   return res.send(products);
    // }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    return res.send(products);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
