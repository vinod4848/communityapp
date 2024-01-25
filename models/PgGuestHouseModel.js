const mongoose = require("mongoose");

const pgGuestHouseSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
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
  isActive: {
    type: Boolean,
    default: false,
  },
});

const PgGuestHouse = mongoose.model("PgGuestHouse", pgGuestHouseSchema);

module.exports = PgGuestHouse;
