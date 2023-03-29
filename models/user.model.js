const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true }, //delete
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },
    mobno: { type: Number, required: true },
    mobno2: { type: Number, required: true }, // delete
    source: { type: String, required: true }, //delete
    uniname: { type: String, required: true }, //delete
    access: { type: String, required: true }, // delete
    extradata: { type: String, required: true }, // array of objects
    isvalid: { type: Boolean, required: true },

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
