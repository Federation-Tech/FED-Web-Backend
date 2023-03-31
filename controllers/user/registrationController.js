const registrationSchema = require("../../models/user-model");
const gravatar = require("gravatar");
const verification = require("./verification");
//
const postData = async (req, res) => {
  req.body.isvalid = false;
  req.body.img = gravatar.url(req.body.email, { protocol: "https", s: "100" });
  const {
    email,
    password,
    name,
    rollno,
    mobno,
    access,
    extradata,
    isvalid,
    img,
  } = req.body;
  if ((req.body.extradata = "")) {
    extradata = {};
  } else {
    if (
      email.includes("@") &&
      mobno.toString().length >= 10 &&
      mobno.toString().length <= 13
    ) {
      // change karo
      try {
        const data = new registrationSchema({
          // save use karo
          email,
          password,
          name,
          rollno,
          mobno,
          access,
          extradata,
          isvalid,
          img,
        });
        await data.save();
        verification.mail(email, name);
        res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    } else {
      res.status(400).json({ error: "invalid details entered" });
    }
  }
};
exports.register = postData;
