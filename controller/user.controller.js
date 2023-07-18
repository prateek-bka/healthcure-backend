const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "User" });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const updateUserDetails = async (req, res) => {
  const { userID } = req.params;
  const payload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: userID }, payload);
    res.status(200).send({ msg: "User has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: "User has been deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
const register = async (req, res) => {
  const { name, email, pass, location, gender } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      // if (user.role == "Admin") {
      //   return res
      //     .status(200)
      //     .send({ msg: "Admin already exist, please login" });
      // }
      return res.status(200).send({ msg: "User already exist, please login" });
    }
    bcrypt.hash(pass, 3, async (err, hash) => {
      const newUser = new UserModel({
        name,
        email,
        pass: hash,
        location,
        gender,
        // role,
      });
      await newUser.save();
      // if (user.role == "Admin") {
      //   return res.status(200).send({ msg: "A new Admin has been created" });
      // }
      res.status(200).send({ msg: "A new User has been created" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { email, pass } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        res.status(200).send({
          msg: "Login Succussfull!",
          token: jwt.sign({ userID: user._id }, `${process.env.secretKey}`),
        });
      } else {
        res.status(400).send({ msg: "Wrong Credentials" });
      }
    });
  } else {
    res
      .status(400)
      .send({ msg: "You are not registered, please register first!" });
  }
};
module.exports = {
  register,
  getAllUsers,
  login,
  deleteUser,
  updateUserDetails,
};
