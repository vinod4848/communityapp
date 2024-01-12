const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const electronicsController = require("../controller/electronicsController");

router.post("/electronics", electronicsController.createElectronics);

router.get("/electronics", electronicsController.getAllElectronics);

router.get("/electronics/:id", electronicsController.getElectronicsById);

router.put("/electronics/:id", electronicsController.updateElectronics);

router.delete("/electronics/:id", electronicsController.deleteElectronics);

router.post(
    "/electronics/:id",
    upload.array("image"),
    electronicsController.uploadElectronicsImages
  );
  
module.exports = router;

