const Category = require("../models/category.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category = await Category.find().lean().exec();
    return res.send(category);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.send(category);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean().exec();
    return res.send(category);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(category);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.send(category);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
