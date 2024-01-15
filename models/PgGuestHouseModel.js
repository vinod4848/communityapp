const mongoose = require("mongoose");

const pgGuestHouseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subtype: {
    type: String,
    enum: ["Guest Houses", "PG", "Roommate"],
    required: true,
  },
  furnishing: {
    type: String,
    enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    required: true,
  },
  carParking: {
    type: Number,
    enum: [0, 1, 2, 3, "3+"],
  },
  mealsIncluded: {
    type: String,
    enum: ["No", "Yes"],
  },
  adTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  price: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
});

const PgGuestHouse = mongoose.model("PgGuestHouse", pgGuestHouseSchema);

module.exports = PgGuestHouse;
