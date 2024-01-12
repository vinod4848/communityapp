const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  family: {
    fatherName: String,
    motherName: String,
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
  image: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
