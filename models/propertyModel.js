const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyFor: {
    type: String,
    enum: [
      "For Sale: Houses & Apartments",
      "For Rent: Houses & Apartments",
      "other",
    ],
    required: true,
  },

  propertyType: {
    type: String,
    enum: ["Apartments", "Builder Floors", "Farm Houses", "Houses & Villas"],
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    required: true,
  },
  constructionStatus: {
    type: String,
    enum: ["New Launch", "Ready to Move", "Under Construction"],
    required: true,
  },
  listedBy: {
    type: String,
    enum: ["Builder", "Dealer", "Owner"],
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
  maintenanceMonthly: {
    type: Number,
  },
  totalFloors: {
    type: Number,
  },
  floorNo: {
    type: Number,
  },
  carParking: {
    type: Number,
    enum: [0, 1, 2, 3, "3+"],
  },
  facing: {
    type: String,
    enum: [
      "East",
      "North",
      "North-East",
      "North-West",
      "South",
      "South-East",
      "South-West",
      "West",
    ],
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
  images: {
    type: [String],
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
