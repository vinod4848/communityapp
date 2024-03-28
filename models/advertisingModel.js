const mongoose = require("mongoose");

const advertisingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bannerPosition: {
    type: String,
    enum: ["topbanner ", "footerbanner", "sidebarbanner"],
  },
  click: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Advertising = mongoose.model("Advertising", advertisingSchema);

module.exports = Advertising;
