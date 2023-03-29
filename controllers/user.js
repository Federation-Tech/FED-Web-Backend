const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.model");
require("dotenv").config();

const login = async (req, res) => {
  const result = await User.findOne({
    email: req.body.username,
  });
  const result2 = await User.findOne({
    mobno: req.body.username,
  });

  if (!result && !result2) {
    return res.json({ status: "error", message: "invalid credential" });
  }

  if (
    req.body.password === result.password ||
    req.body.password === result2.password
  ) {
    if (result.isvalid == true && result2.isvalid == true) {
      const token = jwt.sign(
        {
          userName: result.userName,
        },
        process.env.USER_SECRET_KEY,
        { expiresIn: "86400s" }
      );
      res.json({ status: "ok", user: token });
    } else {
      return res.redirect("/verification");
    }
  } else {
    res.json({ status: "error", user: false });
  }
};

exports.login = login;
