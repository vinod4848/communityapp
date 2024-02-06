const express = require("express");
const notificationController = require("../controller/notificationController");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const unreadNotificationCount =
      await notificationController.getNotificationCount(userId);
    res.json({ unreadNotificationCount });
  } catch (error) {
    console.error("Error getting notification count:", error);
    res.status(500).json({ error: "Failed to get notification count" });
  }
});

router.get("/all/:userId", notificationController.getAllNotifications);

router.put("/mark-read/:notificationId", notificationController.markAsRead);

router.delete(
  "/delete/:notificationId",
  notificationController.deleteNotification
);

module.exports = router;
