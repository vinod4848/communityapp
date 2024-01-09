const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  announcementType: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  image: String,
  isActive: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
