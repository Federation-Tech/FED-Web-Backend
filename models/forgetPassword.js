const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgetPassword = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
});

module.exports = mongoose.model("forgotPassword", forgetPassword);
