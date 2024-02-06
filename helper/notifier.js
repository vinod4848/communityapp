const notifier = require("node-notifier");
const User = require("../models/userV1Model");
const Notification = require("../models/notificationModel");

const sendNotificationOfEventToAllUsers = async (newEvent) => {
  try {
    const allUsers = await User.find({});
    const notifications = [];

    allUsers.forEach((user) => {
      const notificationMessage = `New event added: ${newEvent.title}`;
      notifier.notify({
        title: "New Event",
        message: notificationMessage,
        userId: user._id,
      });
      const notification = new Notification({
        userId: user._id,
        message: notificationMessage,
        timestamp: new Date(),
        isRead: false,
      });

      notifications.push(notification);
    });

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error("Error sending and saving notifications:", error.message);
  }
};

module.exports = sendNotificationOfEventToAllUsers;
