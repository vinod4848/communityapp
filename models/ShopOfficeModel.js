const mongoose = require("mongoose");

const shopOfficeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    required: true,
  },
  listedBy: {
    type: String,
    enum: ["Builder", "Dealer", "Owner"],
    required: true,
  },
  shopOfficeType: {
    type: String,
    enum: ["For Rent: Shops & Offices", " For Sale: Shops & Offices", "other"],
    required: true,
  },
  superBuiltupArea: {
    type: Number,
    required: true,
  },
  carpetArea: {
    type: Number,
    required: true,
  },
  maintenance: {
    type: Number,
  },
  carParking: {
    type: Number,
    enum: [0, 1, 2, 3, "3+"],
  },
  washrooms: {
    type: Number,
    required: true,
  },
  projectName: {
    type: String,
  },
  adTitle: {
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
  images: [{ type: String }],
});

const ShopOffice = mongoose.model("ShopOffice", shopOfficeSchema);

module.exports = ShopOffice;
