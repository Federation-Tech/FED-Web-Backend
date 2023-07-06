const { ObjectId } = require("mongodb");
const client = require("../../config/db").mongoClient;
const formDb = require("../../models/form");
const eventDb = require("../../models/event");
async function registerForm(req, res, next) {
  const { formid } = req.body;
  const { _id } = req.user;
  const form = await formDb.findById(formid).populate("event");
  const user = req.user;
  if (form.amount == 0) {
    await client
      .db(form.event.title.replace(" ", "_"))
      .collection(form.title.replace(" ", "_"))
      .insertOne({
        submision: req.body,
        user: req.user._id,
      });
    res.send("ok");
  } else {
    //redirect to payment gateway
  }
}
exports.register = registerForm;
