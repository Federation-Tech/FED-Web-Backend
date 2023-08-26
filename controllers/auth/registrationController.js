const registrationSchema = require("../../models/user-model");
const gravatar = require("gravatar");
const verification = require("./verification");
const User = require("../../models/user-model");
const { validationResult } = require("express-validator");

const postData = async (req, res) => {
  console.log(`Registration request received for ${req.body.email}`);

  req.body.isvalid = false;
  req.body.img = gravatar.url(
    req.body.email,
    { s: "100", r: "x", d: "retro" },
    true
  );

  if (req.body.email === "fedkiit@gmail.com") {
    req.body.access = 0;
  } else {
    req.body.access = 1;
  }

  const {
    email,
    password,
    name,
    access,
    extradata,
    isvalid,
    img,
    RollNumber,
    School,
    College,
    MobileNo,
    selected,
    linkedin,
    github,
  } = req.body;

  const user = await User.findOne({ email });

  if ((req.body.extradata = "" || !req.body.extradata)) {
    req.body.extradata = {};
  }

  if (user) {
    console.log("User already exists");
    return res.status(400).json({ code: 1, message: "User already exists" });
  }
  if (email.includes("@")) {
    try {
      const data = new registrationSchema({
        email,
        password,
        name,
        access,
        extradata,
        isvalid,
        img,
        RollNumber,
        School,
        College,
        MobileNo,
        selected,
        linkedin,
        github
      });

      await data.save();
      verification.mail(email, name);

      console.log("registration done");

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log("registration err " + err);
      return res.status(400).json({ code: 2, error: err.message });
    }
  } else {
    console.log("invalid data entered sending err...");
    res.status(400).json({ code: 2, error: "invalid details entered" });
  }
};

exports.register = postData;
