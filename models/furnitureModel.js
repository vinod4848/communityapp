const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  approvedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  locked: {
    type: Boolean,
    default: false,
  },
  furnitures: {
    type: String,
    default: "furnitures",
  },
  furnitureType: {
    type: String,
    enum: [
      "Sofa & Dining",
      "Beds & Wardrobes",
      "Home Decor & Garden",
      "Kids Furniture",
      "Other Household Items",
      "other",
    ],
    required: true,
  },
  used:{
    type: String,
    enum: ["New", "Old"],
    required: true,
  },
  adTitle:{
    type: String,
    required: true,
  },
  description: {
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
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
