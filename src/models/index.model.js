const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  prodName: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("products", prodSchema);
