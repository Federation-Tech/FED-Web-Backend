const registrationSchema = require("../models/registration");
const mongoose = require("mongoose");

//
const postData = async (req, res) => {
  const {
    email,
    password,
    name,
    roll,
    mobNo,
    mobNo2,
    source,
    uniName,
    access,
    extraData,
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
      if (email.contains("@") && mobNo.length === 10 && mobNo2.length === 10) {
        // change karo
        try {
          const data = await registrationSchema.create({
            // save use karo
            email,
            password,
            name,
            roll,
            mobNo,
            mobNo2,
            source,
            uniName,
            access,
            extraData,
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
