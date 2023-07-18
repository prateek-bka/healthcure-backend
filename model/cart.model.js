const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product: String,
    name: String,
    image: String,
    price1: Number,
    category: String,
    quantity: Number,
    price2: Number,
    discount: Number,
    star_rating: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};
