var moment = require("moment");
const { validationResult } = require("express-validator");

// models
const contactData = require("../../models/contact-us");

async function postcontact(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    var date = moment().utc("Asia/Kolkata").format("DD-MM-yyyy").toString();
    var contactus = new contactData({ date, name, email, message });
    await contactus.save();
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
}

const getContact = async (req, res, next) => {
  console.log("getContact");
};

exports.postcontact = postcontact;
exports.getContact = getContact;
