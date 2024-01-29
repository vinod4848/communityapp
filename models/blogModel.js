const mongoose = require("mongoose");
const Notification = require("../models/notificationModel");
const User = require("../models/userV1Model");
const io = require("../helper/socket");

const blogsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.isPublic;
      },
    },
  },

  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: false,
    },
  }
);

blogsSchema.post("save", async function (doc) {
  try {
    const users = await User.find();
    const newBlog = doc;

    console.log("Emitting 'newBlog' event");
    io.sockets.emit("newBlog", {
      message: `New blog "${newBlog.title}" added!`,
    });

    const notifications = users.map((user) => {
      return new Notification({
        userId: user._id,
        message: `New blog "${newBlog.title}" added!`,
      });
    });

    console.log("Created notifications:", notifications);

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
});

const Blog = mongoose.model("Blog", blogsSchema);

module.exports = Blog;
