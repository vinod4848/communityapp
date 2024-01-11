const express = require("express");
const router = express.Router();
const applicationController = require("../controller/applicationController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/applications", applicationController.applyForJob);

router.get("/applications", applicationController.getAllApplications);

router.get("/applications/:id", applicationController.getApplicationById);

router.put("/applications/:id", applicationController.updateApplicationById);

router.delete("/applications/:id", applicationController.deleteApplicationById);

router.post(
    "/UploadResume/application/:id",
    upload.single("image"),
    applicationController.uploadResume
  );
module.exports = router;
