const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    quantity: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
