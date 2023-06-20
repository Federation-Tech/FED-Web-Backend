const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relation = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "userdb" },
  permission: { type: mongoose.Types.ObjectId, ref: "permission" },
});

module.exports = mongoose.model("userPermissionRelation", relation);
