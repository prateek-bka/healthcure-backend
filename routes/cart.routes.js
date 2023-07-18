const express = require("express");
const {
  addToCart,
  getProductsOfCart,
  deleteCartItem,
} = require("../controller/cart.controller");
const { auth } = require("../middleware/auth.middleware");
const cartRouter = express.Router();

cartRouter.post("/add/:productID", auth, addToCart);
cartRouter.get("/", auth, getProductsOfCart);
cartRouter.delete("/delete/:productID", auth, deleteCartItem);

module.exports = {
  cartRouter,
};
