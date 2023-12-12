const express = require('express');
const router = express.Router();
const matrimonialController = require('../controller/matrimonialController');

// Routes
router.get('/matrimonial/profiles', matrimonialController.getAllProfiles);
router.get('/matrimonial/profiles/:id', matrimonialController.getProfileById);
router.post('/matrimonial/profiles', matrimonialController.addProfile);
router.put('/matrimonial/profiles/:id', matrimonialController.updateProfile);
router.delete('/matrimonial/profiles/:id', matrimonialController.deleteProfile);

module.exports = router;
