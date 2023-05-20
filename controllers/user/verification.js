const jwt = require("jsonwebtoken");
const db = require("../../models/user-model");
const mailer = require("../../mailer/mailer");
const path = require('path');

async function verfication(req, res) {
  console.log("verification request received");
  var token = req.params.token;
  var vemail = await jwt.verify(token, process.env.verification_token_key);
  await db.findOneAndUpdate({ email: vemail }, { isvalid: true });
  res.sendFile(path.join(__dirname, '../', 'verified', 'index.html'));
}

async function sendverficationmail(email, name) {
  var mail = {
    to: email,
    subject: "Verify Your Mail Please",
    text:
      process.env.server_address +
      "/auth/verification/" +
      jwt.sign(email, process.env.verification_token_key),
  };
  console.log(await mailer.sendMail(mail));
}

exports.verify = verfication;
exports.mail = sendverficationmail;
