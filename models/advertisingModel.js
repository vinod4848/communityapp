const mongoose = require("mongoose");

const advertisingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  image:{
    type:String
  },
  startDate: {
    type: Date,
    required: true,
  },
  isApproved: { type: Boolean, default: function () { return this.isPublic; } },
  endDate: {
    type: Date,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  log: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      event: String,
      details: String,
    },
  ],
});

const Advertising = mongoose.model("Advertising", advertisingSchema);

module.exports = Advertising;
