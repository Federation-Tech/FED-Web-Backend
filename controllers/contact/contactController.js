var moment = require("moment");
const { validationResult } = require("express-validator");

// models
const contactData = require("../../models/contactUs");

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
  try {
    const contactUsData = await contactData.find();

    if (contactUsData) {
      return res
        .status(202)
        .json({ contactUsData, lenght: contactUsData.length });
    } else {
      return res.status(304).json({ msg: "Unaccepted Error" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
    console.log(error);
  }
};

exports.postcontact = postcontact;
exports.getContact = getContact;
