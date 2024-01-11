const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  photos: {
    type: [String],
    required: true,
  },
});

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;
