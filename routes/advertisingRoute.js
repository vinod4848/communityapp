const express = require('express');
const router = express.Router();
const advertisingController = require('../controller/advetisingController');

// Routes
router.get('/advertisements/search', advertisingController.searchAdvertising);
router.get('/advertisements', advertisingController.getAllAdvertisements);
router.get('/advertisements/:id', advertisingController.getAdvertisementById);
router.post('/advertisements', advertisingController.addAdvertisement);
router.put('/advertisements/:id', advertisingController.updateAdvertisement);
router.delete('/advertisements/:id', advertisingController.deleteAdvertisement);

module.exports = router;
