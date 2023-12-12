const express = require("express");
const { uploadimgs, deleteimgs } = require("../controller/uploadCtrl");
const { uploadphoto, productimgResize } = require("../middleware/uploadimg");
const router = express.Router();
router.post("/", uploadphoto.array("images", 10), productimgResize, uploadimgs);
router.delete("/delete-img/:id", deleteimgs);

module.exports = router;
