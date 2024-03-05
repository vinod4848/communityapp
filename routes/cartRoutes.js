const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/addToCart", cartController.addToCart);
router.get("/getCartItems", cartController.getCartItems);
router.get("/getCartItemsById/:productId", cartController.getCartItemsById);
module.exports = router;
