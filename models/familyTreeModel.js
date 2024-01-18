const mongoose = require("mongoose");

const individualSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  relationship: { type: String, required: true },
  dateOfBirth: { type: Date },
  image: { type: String },
});

const Individual = mongoose.model("Individual", individualSchema);

module.exports = { Individual };
