const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "InProgress", "Resolved"],
    default: "Pending",
  },
  reportBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
