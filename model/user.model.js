const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    pass: { type: String },
    location: { type: String },
    gender: { type: String },
    // role: { type: String, enum: ["Admin", "User"] },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
