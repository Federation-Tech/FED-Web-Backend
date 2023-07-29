const registrationSchema = require("../../models/user-model");
const gravatar = require("gravatar");
const User = require("../../models/user-model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const postData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(`Registration request received for ${req.body.email}`);

  req.body.isvalid = true;

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
    RollNumber,
    School,
    College,
    MobileNo,
    selected,
    img,
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
      });

      await data.save();

      console.log("registration done");

      const user = await User.findOne({ email: email });
      if (user) {
        const token = jwt.sign(
          {
            username: user.email,
            access: user.access,
          },
          process.env.access_token_key,
          { expiresIn: "86400s" } // one day
        );

        console.log("login success");

        user.isvalid = undefined;
        user["password"] = undefined;
        user["__v"] = undefined;

        res.status(202).json({ status: true, token: token, user });
      } else {
        return res.json({ code: 4, message: "User does not exists" });
      }
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
