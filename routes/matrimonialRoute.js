const express = require('express');
const router = express.Router();
const matrimonialController = require('../controller/matrimonialController');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Routes
router.get('/matrimonial/profiles', matrimonialController.getAllProfiles);
router.get('/matrimonial/profiles/:id', matrimonialController.getProfileById);
router.post('/matrimonial/profiles', matrimonialController.addProfile);
router.put('/matrimonial/profiles/:id', matrimonialController.updateProfile);
router.delete('/matrimonial/profiles/:id', matrimonialController.deleteProfile);
router.post(
    "/uploadImage/matrimonial/profiles/:id",
    upload.single("image"),
    matrimonialController.uploadMatrimonialProfileImage
  );
module.exports = router;
