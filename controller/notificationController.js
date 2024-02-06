const Notification = require("../models/notificationModel");

const getAllNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId }).sort({
      timestamp: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await Notification.findByIdAndRemove(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNotificationCount = async (userId) => {
  try {
    const count = await Notification.countDocuments({ userId, isRead: false });
    return count;
  } catch (error) {
    console.error("Error getting notification count:", error);
    throw error;
  }
};

module.exports = {
  getAllNotifications,
  markAsRead,
  deleteNotification,
  getNotificationCount,
};
