const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
