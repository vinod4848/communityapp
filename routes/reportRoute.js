const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMultipleImage = multer({ dest: "uploads/" });
const reportController = require("../controller/reportController");

router.post("/reports", reportController.createReport);
router.get("/reports", reportController.getAllReports);
router.get("/reports/:id", reportController.getReportById);
router.put("/reports/:id", reportController.updateReportById);
router.delete("/reports/:id", reportController.deleteReportById);
router.post(
  "/reportImage/:id",
  uploadMultipleImage.array("image"),
  reportController.reportImage
);

module.exports = router;
