const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserV1",
    required: true,
  },
  fullname: {
    type: String,
  },
  image: {
    type: String,
  },
  Relationship: {
    type: String,
    enum: [
      "Father",
      "Mother",
      "Son",
      "Daughter",
      "Grandfather",
      "Grandmother",
      "Uncle",
      "Aunt",
      "Brother",
      "Cousin",
      "Nephew",
      "Niece",
      "Husband",
      "Wife",
      "Partner",
      "Fiance",
      "Fiancee",
      "Ex-Spouse",
      "In-law",
      "Guardian",
      "Godfather",
      "Godmother",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
