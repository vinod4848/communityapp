const mongoose = require("mongoose");

const fashionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fashionType: {
    type: String,
    enum: ["Men", "Women", "Kids", "other"],
    required: true,
  },
  adTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
});

const Fashion = mongoose.model("Fashion", fashionSchema);

module.exports = Fashion;
