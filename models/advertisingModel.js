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
});

const Advertising = mongoose.model("Advertising", advertisingSchema);

module.exports = Advertising;
