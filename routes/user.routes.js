const express = require("express");
const {
  register,
  getAllUsers,
  login,
  deleteUser,
  updateUserDetails,
} = require("../controller/user.controller");
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/validator");

const userRouter = express.Router();

// Admins Routes
userRouter.get("/", auth, validator, getAllUsers);
userRouter.patch("/update/:userID", auth, validator, updateUserDetails);
userRouter.delete("/delete/:userID", auth, validator, deleteUser);

// Users Routes but admin have to register and login using these routes
// for user role should be 'Role' and for admin role should be 'Admin'
userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = {
  userRouter,
};
