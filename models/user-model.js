const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    required: true,
  },
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
  hashID: {
    type: String,
    default: "00HLk~",
  },
});

module.exports = mongoose.model("userdb", registrationData);
