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
  isApproved: {
    type: Boolean,
    default: function () {
      return this.isPublic;
    },
  },
});

const Advertising = mongoose.model("Advertising", advertisingSchema);

module.exports = Advertising;
