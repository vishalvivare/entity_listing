const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.send(user);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.send(user);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();
    return res.send(user);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(user);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.send(user);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
