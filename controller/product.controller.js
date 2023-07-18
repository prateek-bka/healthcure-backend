const { ProductModel } = require("../model/products.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getAllProducts = async (req, res) => {
  const { category, sortByPrice } = req.query;
  try {
    if (sortByPrice && category) {
      if (sortByPrice == "asc") {
        const products = await ProductModel.find({ category }).sort({
          price1: 1,
        });
        return res.status(200).send(products);
      } else if (sortByPrice == "desc") {
        const products = await ProductModel.find({ category }).sort({
          price1: -1,
        });
        return res.status(200).send(products);
      }
    }
    if (sortByPrice) {
      if (sortByPrice == "asc") {
        const products = await ProductModel.find().sort({
          price1: 1,
        });
        return res.status(200).send(products);
      } else if (sortByPrice == "desc") {
        const products = await ProductModel.find().sort({
          price1: -1,
        });
        return res.status(200).send(products);
      }
    }
    if (category) {
      const products = await ProductModel.find({ category });
      return res.status(200).send(products);
    }
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.productID });
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).send({ msg: "A new Product has been added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, `${process.env.secretKey}`);
  const productID = req.params.productID;
  const req_id = decoded.userID;
  const product = await ProductModel.findOne({ _id: productID });
  const user_in_product = product.userID;
  try {
    if (req_id === user_in_product) {
      await ProductModel.findByIdAndUpdate({ _id: productID }, payload);
      res.status(200).send({ msg: "Product has been updated succussfully!" });
    } else {
      res.status(400).send({ msg: "You are not Authorised" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};
const deleteProduct = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, `${process.env.secretKey}`);
  const productID = req.params.productID;
  const req_id = decoded.userID;
  const product = await ProductModel.findOne({ _id: productID });
  const user_in_product = product.userID;
  try {
    if (req_id === user_in_product) {
      await ProductModel.findByIdAndDelete({ _id: productID });
      res.status(200).send({ msg: "Product has been deleted succussfully!" });
    } else {
      res.status(400).send({ msg: "You are not Authorised" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = {
  addNewProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
