const express = require('express');
const router = express.Router();
const directoryController = require('../controller/directoryController');
const multer = require("multer");
const uploadMultipleImage = multer({ dest: "uploads/" });

// Routes
router.get('/directories', directoryController.getAllDirectories);
router.get('/directories/:id', directoryController.getDirectoryById);
router.get('/searchDirectory', directoryController.searchDirectory);
router.post('/directories', directoryController.addDirectory);
router.put('/directories/:id', directoryController.updateDirectory);
router.delete('/directories/:id', directoryController.deleteDirectory);
router.post(
    "/logoImage/:id",
    uploadMultipleImage.array("logo"),
    directoryController.logoImage
  );
module.exports = router;
