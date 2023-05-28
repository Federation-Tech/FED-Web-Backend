const { validationResult } = require("express-validator");
const passGenerator = require("generate-password");
const bcrypt = require("bcrypt");
const mailer = require("./../../mailer/mailer");
const User = require("../../models/user-model");

const showMembers = async (req, res) => {
  console.log("request to show all member");
  res.status(202).json("people");
};

const addMembers = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, access, email, img } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    console.log("Member already exists");
    return res.status(400).json({ code: 1, message: "Member already exists" });
  }

  if (email.includes("@")) {
    try {
      console.log("sending data to db");
      const password = passGenerator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });
      const hashedPassword = bcrypt.hashSync(
        password,
        "$2b$10$Q0RPeouqYdTToq76zoccIO"
      );

      console.log("Password Sent");

      mailer.sendMail({
        to: email,
        subject: "Member Login Details",
        text: `Dear ${name},
            
            Your login details for the FED website are as follows:
              Email: ${email}
              Password: ${password}`,
      });

      console.log("Mail sent");

      const data = new User({
        email: email,
        name: name,
        access: access,
        isvalid: true,
        password: hashedPassword,
        img: img,
        extradata: {},
        RollNumber: "None",
        School: "None",
        College: "None",
        MobileNo: "None",
        selected: "None",
      });

      await data.save();
      console.log("+ Member Added");

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "error", err });
    }
  } else {
    console.log("invalid data entered sending err...");
    res.status(400).json({ code: 2, error: "invalid details entered" });
  }
};

exports.addMembers = addMembers;
exports.showMembers = showMembers;
