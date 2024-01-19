const express = require("express");
const router = express.Router();
const individualController = require("../controller/userV1Controller");

router.post("/signup", individualController.signup);
router.post("/login", individualController.login);
router.post('/verify-login', individualController.verifyOTP);

module.exports = router;
