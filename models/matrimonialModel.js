const mongoose = require("mongoose");

const matrimonialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  image: {
    type: String,
  },
  education: {
    degree: String,
    institution: String,
    completionYear: Number,
  },
  profession: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
  },
  nativePlace: {
    type: String,
  },
  family: {
    fatherName: String,
    motherName: String,
    siblings: {
      brothers: Number,
      sisters: Number,
    },
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
