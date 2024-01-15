const mongoose = require("mongoose");

const landPlotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["For Rent", "For Sale"],
    required: true,
  },
  listedBy: {
    type: String,
    enum: ["Builder", "Dealer", "Owner"],
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

const LandPlot = mongoose.model("LandPlot", landPlotSchema);

module.exports = LandPlot;
