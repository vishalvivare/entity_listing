const Address = require("../models/address.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const address = await Address.find().populate("user_id").lean().exec();
    return res.send(address);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    return res.send(address);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).lean().exec();
    return res.send(address);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(address);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    return res.send(address);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
