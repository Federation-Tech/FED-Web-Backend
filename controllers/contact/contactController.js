var moment = require("moment");

// models
const contactData = require("../../models/contact-us");

async function postcontact(req, res, next) {
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
