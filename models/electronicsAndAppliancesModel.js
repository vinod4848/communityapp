const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  electronicsAndAppliances: {
    type: String,
    enum: [
      "TVs, Video - Audio",
      "Kitchen & Other Appliances",
      "Computers & Laptops",
      "Cameras & Lenses",
      "Games & Entertainment",
      "Fridges",
      "Computer Accessories",
      "Hard Disks, Printers & Monitors",
      "ACs",
      "Washing Machines",
      "other",
    ],
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
  image:[],
});

const Electronics = mongoose.model("Electronics", electronicsSchema);

module.exports = Electronics;
