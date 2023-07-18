const { CartModel } = require("../model/cart.model");
const { ProductModel } = require("../model/products.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getProductsOfCart = async (req, res) => {
  try {
    const cart = await CartModel.find({ userID: req._id });
    if (cart.length == 0) {
      return res.status(200).send({ msg: "Your cart is empty!" });
    }
    return res.status(200).send(cart);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const addToCart = async (req, res) => {
  const { reqQuantity, type } = req.body;
  const { productID } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, `${process.env.secretKey}`);

  try {
    const product = await ProductModel.findById({ _id: productID });
    const cartItem = await CartModel.findOne({
      userID: req._id,
      product: productID,
    });
    const {
      name,
      image,
      price1,
      category,
      quantity,
      price2,
      discount,
      star_rating,
      userID,
    } = product;
    // product.userID=decoded.userID
    if (!cartItem) {
      if (Check(product.quantity, reqQuantity)) {
        return res.send({
          msg: `Database hav only ${product.quantity} quantity left`,
        });
      } else {
        const cart = await CartModel.create({
          product: productID,
          name,
          image,
          price1,
          category,
          price2,
          discount,
          star_rating,
          userID: decoded.userID,
          quantity: reqQuantity,
        });
        await ProductModel.findByIdAndUpdate(
          { _id: productID },
          { $inc: { quantity: -1 } }
        );
        return res.send(cart);
      }
    } else {
      if (!type) {
        return res.status(400).send({ msg: "Type is missing" });
      } else if (type === "inc") {
        if (Check(product.quantity, reqQuantity)) {
          return res.send({
            msg: `Database hav only ${product.quantity} quantity left`,
          });
        } else {
          await CartModel.findOneAndUpdate(
            { product: productID },
            { $inc: { quantity: 1 } }
          );
          await ProductModel.findByIdAndUpdate(
            { _id: productID },
            { $inc: { quantity: -1 } }
          );
          return res
            .status(200)
            .send({ msg: "Cart has been updated succussfully" });
        }
      } else if (type === "dec") {
        if (cartItem.quantity == 1) {
          await ProductModel.findByIdAndUpdate(
            { _id: productID },
            { $inc: { quantity: 1 } }
          );
          await CartModel.findByIdAndDelete({ _id: cartItem._id });
          return res
            .status(200)
            .send({ msg: "Product has been deleted from cart" });
        } else {
          const cart = await CartModel.findOneAndUpdate(
            { product: productID },
            { $inc: { quantity: -1 } }
          );
          await ProductModel.findOneAndUpdate(
            { _id: productID },
            { $inc: { quantity: 1 } }
          );
          return res.status(200).send({ msg: "Quantity has been decremented" });
        }
      }
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

function Check(productQunatity, comingQuantity) {
  if (productQunatity < comingQuantity) {
    return true;
  } else {
    return false;
  }
}

const deleteCartItem = async (req, res) => {
  try {
    const cart = await CartModel.findById({ _id: req.params.productID });
    const product = await ProductModel.findByIdAndUpdate(
      { _id: cart.product },
      { $inc: { quantity: cart.quantity } }
    );
    await CartModel.findByIdAndDelete({ _id: cart._id });
    return res.status(200).send({ msg: "Product has been deleted from cart" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};
module.exports = {
  addToCart,
  getProductsOfCart,
  deleteCartItem,
};
