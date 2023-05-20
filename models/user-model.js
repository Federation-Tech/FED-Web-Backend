const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  access: {
    type: String,
    required: true,
  },
  // array of objects
  extradata: {
    type: Array,
    required: true,
  },
  isvalid: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  RollNumber: {
    type: String,
    required: true,
  },
  School: {
    type: String,
    required: true,
  },
  College: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userdb", registrationData);
