const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, required: true },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);
