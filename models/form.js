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
      valueToFill: {
        type: String,
        default: undefined,
      },
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
  maxReg: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("form", formData);
