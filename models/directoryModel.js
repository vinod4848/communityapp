const mongoose = require("mongoose");

const directorySchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  locked: {
    type: Boolean,
    default: false,
  },
  images: {
    type: [String],
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  businessArea: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  socialMediaLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
  },
  tags: {
    type: [String],
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.isPublic;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
