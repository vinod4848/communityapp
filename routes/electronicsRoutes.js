const express = require("express");
const router = express.Router();
const electronicsController = require("../controller/electronicsController");

router.post("/electronics", electronicsController.createElectronics);

router.get("/electronics", electronicsController.getAllElectronics);

router.get("/electronics/:id", electronicsController.getElectronicsById);

router.put("/electronics/:id", electronicsController.updateElectronics);

router.delete("/electronics/:id", electronicsController.deleteElectronics);

module.exports = router;

