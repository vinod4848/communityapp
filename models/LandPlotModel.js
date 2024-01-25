const mongoose = require("mongoose");

const landPlotSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  type: {
    type: String,
    enum: ["For Rent", "For Sale"],
    required: true,
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
  plotArea: {
    length: {
      type: Number,
      required: true,
    },
    breadth: {
      type: Number,
      required: true,
    },
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

const LandPlot = mongoose.model("LandPlot", landPlotSchema);

module.exports = LandPlot;
