const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  buyerProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "productModel",
    required: true,
  },
  productModel: {
    type: String,
    enum: ["LandPlot", "PgGuestHouse", "Property", "ShopOffice"],
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
