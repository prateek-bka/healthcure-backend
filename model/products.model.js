const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
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

const ProductModel = mongoose.model("product", productsSchema);

module.exports = {
  ProductModel,
};
