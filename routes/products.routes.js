const express = require("express");
const {
  addNewProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controller/product.controller");
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/validator");

const productRouter = express.Router();

productRouter.get("/", auth, getAllProducts);
productRouter.get("/:productID", auth, getProductById);
productRouter.post("/add", auth, validator, addNewProduct);
productRouter.patch("/update/:productID", auth, validator, updateProduct);
productRouter.delete("/delete/:productID", deleteProduct);

module.exports = {
  productRouter,
};
