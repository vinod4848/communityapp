const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, require: true },
    data: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    GalleryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gallery" }],
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: false,
    },
  }
);

const Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
