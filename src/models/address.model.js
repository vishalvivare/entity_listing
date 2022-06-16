const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
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

module.exports = mongoose.model("address", addressSchema);
