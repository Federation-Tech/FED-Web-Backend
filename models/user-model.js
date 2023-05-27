const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
<<<<<<< HEAD
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  access: { type: String, required: true },
  extradata: { type: Array, required: true }, // array of objects
  isvalid: { type: Boolean, required: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  RollNumber: { type: String, required: true },
  School: { type: String, required: true },
  College: { type: String, required: true },
  MobileNo: { type: String, required: true },
  selected: { type: String, required: true },
=======
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  altEmail: {
    type: String,
    default: "",
  },
  access: {
    type: String,
    required: true,
  },
  // array of objects
  // extradata: {
  //   type: Array,
  //   required: true,
  // },
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
  social: {
    github: {
      type: String,
      default: "",
      required: true,
    },
    linkedin: {
      type: String,
      default: "",
      required: true,
    },
    instagram: {
      type: String,
      default: "",
      required: true,
    },
  },
=========
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  access: { type: String, required: true },
  extradata: { type: Array, required: true }, // array of objects
  isvalid: { type: Boolean, required: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  RollNumber: { type: String, required: true },
  School: { type: String, required: true },
  College: { type: String, required: true },
  MobileNo: { type: String, required: true },
  selected: { type: String, required: true },
>>>>>>>>> Temporary merge branch 2
});

module.exports = mongoose.model("userdb", registrationData);
