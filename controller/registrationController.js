const registrationSchema = require("../models/registration");
const mongoose = require("mongoose");
const gravatar = require("gravator");
//
const postData = async (req, res) => {
  req.body.isvalid = false;
  req.body.img = gravatar.url(req.body.email, { protocol: "https", s: "100" });
  const {
    email,
    password,
    name,
    roll,
    mobNo,
    access,
    extraData,
    isvalid,
    img,
  } = req.body;

  //try catch
  const existingEmail = await registrationSchema.findOne({
    email: req.body.email,
  });

  if (existingEmail) {
    res.status(400).json({ error: error.message });
  } else {
    if ((req.body.extraData = "")) {
      extraData = {};
    } else {
      if (email.contains("@") && mobNo.length >= 10 && mobNo.length <= 13) {
        // change karo
        try {
          const data = await registrationSchema.save({
            // save use karo
            email,
            password,
            name,
            roll,
            mobNo,
            access,
            extraData,
            isvalid,
            img,
          });
          res.status(200).json(data);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: "invalid details entered" });
      }
    }
  }
};
