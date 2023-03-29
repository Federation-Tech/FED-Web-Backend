const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },
    mobno: { type: Number, required: true },
    access: { type: String, required: true },
    extradata: { type: Object, required: true }, // array of objects
    isvalid: { type: Boolean, required: true },
    img: { type: String, required: true },
    // img?

    // level (access)
    // member                                               user
    // department -> ops, tech, creative, marketing
    // admin
  },
  {
    collection: "user-Log-data",
  }
);

const model = mongoose.model("userLogData", User);
module.exports = model;
