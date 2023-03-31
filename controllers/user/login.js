const jwt = require("jsonwebtoken");
const User = require("../../models/user-model");
require("dotenv").config();

const login = async (req, res) => {
  const result = await User.find({
    $or: [{ email: req.body.username }, { mobno: req.body.username }],
  }).exec();
  if (!result[0]) {
    return res.json({ status: "error", message: "invalid credential" });
  }
  if (req.body.password === result[0].password) {
    if (result[0].isvalid == true) {
      const token = jwt.sign(
        {
          username: result[0].email,
        },
        process.env.access_token_key,
        { expiresIn: "86400s" } // one day
      );
      res.json({ status: "ok", user: token });
    } else {
      return res.json({ error: "verfication error" });
    }
  } else {
    res.json({ status: "error", user: false });
  }
};

exports.login = login;
