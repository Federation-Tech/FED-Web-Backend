const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formData = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  formelement: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        default: null,
      },
      required:{
        type:Boolean,
        default:true,
      }
    },
  ],
  event: {
    type: Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  isTeam: {
    type: Boolean,
    default: false,
  },
  teamsize: {
    type: Number,
    default: 0,
  },
  maxReg: {
    type: Number,
    required: true,
    default: 0,
  },
  upi: {
    type: String,
    default: null,
  },
  img: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
  mail: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("form", formData);
