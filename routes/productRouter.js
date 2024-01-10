const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/products", productController.createProduct);

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.put("/products/:id", productController.updateProductById);

router.delete("products/:id", productController.deleteProductById);

router.post(
    "/products/:id",
    upload.single("image"),
    productController.uploadProductImage
  );
module.exports = router;
