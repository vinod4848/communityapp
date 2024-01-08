const mongoose = require("mongoose");

const matrimonialSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
  },
  income: {
    type: Number,
  },
  nativePlace: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  partnerPreferences: {
    ageRange: {
      min: Number,
      max: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    education: String,
    profession: String,
    minHeight: Number,
    maxIncome: Number,
  },
  height:{
    type: Number,
  },
  aboutMe: String,
  hobbies: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MatrimonialProfile = mongoose.model(
  "MatrimonialProfile",
  matrimonialSchema
);

module.exports = MatrimonialProfile;
