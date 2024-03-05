const Cart = require("../models/addtocart");

const addToCart = async (req, res) => {
  try {
    const { buyerProfileId, productId, productModel } = req.body;
    const newCartItem = await Cart.create({
      buyerProfileId,
      productId,
      productModel,
    });
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error adding item to the cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("buyerProfileId")
      .populate("productId");

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCartItemsById = async (req, res) => {
  try {
    const { productId } = req.params;
    const cartItems = await Cart.find({ productId })
      .populate("buyerProfileId")
      .populate("productId");
    const uniqueBuyersCount = await Cart.distinct("buyerProfileId", {
      productId,
    }).length;
    res.status(200).json({ cartItems, uniqueBuyersCount });
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  addToCart,
  getCartItems,
  getCartItemsById,
};