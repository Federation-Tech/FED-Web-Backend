const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const User = require("../../models/user-model");
const { validationResult } = require("express-validator");

const GoogleReg = async (req, res) => {
  console.log(`Registration request received for ${req.body.email}`);

  req.body.isvalid = true;
  req.body.img = gravatar.url(
    req.body.email,
    { s: "200", r: "pg", d: "mm" },
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

const googleSignUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  console.log(`FED-TECH -> Google Login Request by ${email}`);

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.isvalid === true) {
        const token = jwt.sign(
          {
            username: email,
            access: user.access,
          },
          process.env.access_token_key,
          { expiresIn: "86400s" }
        );

        console.log(`FED-TECH -> ${email} Login Success 🥳`);

        user.isvalid = undefined;
        user["password"] = undefined;

        res.status(202).json({ status: true, token, user });
      } else {
        console.log(`FED-TECH -> ${email} is not Verified [Google Login] `);
        return res.json({ status: false, message: "verfication error" });
      }
    } else {
      console.log("------------------------------------- New User");

      console.log(
        `FED-TECH -> User does not exists Requested by ${email} [Google Login] `
      );
      return res.json({ status: false, message: "User does not exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.GoogleReg = GoogleReg;
exports.googleSignUp = googleSignUp;
