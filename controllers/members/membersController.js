const { validationResult } = require("express-validator");
const passGenerator = require("generate-password");
const bcrypt = require("bcrypt");
const mailer = require("./../../mailer/mailer");
const User = require("../../models/user-model");

const showMembers = async (req, res) => {
  const users = await User.find({
    access: { $nin: [1, 7] },
    isvalid: true,
  });

  res.status(202).json({ status: true, users });
};

const showAlumni = async (req, res) => {
  const users = await User.find({ access: 7, isvalid: true });

  res.status(202).json({ status: true, users });
};

const addMembers = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, access, email, img } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    if (user.isvalid == true) {
      console.log("Member already exists");
      return res
        .status(400)
        .json({ code: 1, message: "Member already exists" });
    }
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

      await User.updateOne(
        { email: req.body.email },
        {
          $set: {
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
          },
        },
        { upsert: true }
      );
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

const addAlumni = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (res.locals.userData.access == 0) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("no member with this email");
      return res
        .status(400)
        .json({ code: 1, message: "no member with this email" });
    }

    if (user.access == 7) {
      console.log("Already alumni");
      return res.status(400).json({ code: 1, message: "Already alumni" });
    }

    if (user.access == 0) {
      console.log("Admin can't be alumni");
      return res
        .status(400)
        .json({ code: 1, message: "Admin can't be alumni" });
    }

    try {
      await User.updateOne(
        { email: email },
        {
          $set: {
            access: 7,
          },
        },
        { upsert: true }
      );

      // await data.save();
      console.log("Alumni Added");

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "error", err });
    }
  } else {
    console.log("unauthorized");
    res.status(400).json({ msg: "error" });
  }
};

const deleteMember = async (req, res) => {
  try {
    var result = await User.findOne({ email: req.body.user });
    if (result.access == 0) {
      await User.updateOne(
        {
          $and: [{ email: req.body.email }, { access: { $not: { $eq: "0" } } }],
        },
        { isvalid: false }
      );
      res.status(200).json({ msg: "ok" });
    } else {
      res.status(403).json({ msg: "unauthorised" });
    }
  } catch (err) {
    res.status(403).json({ msg: "unauthorised", err });
  }
};

exports.addMembers = addMembers;
exports.showAlumni = showAlumni;
exports.showMembers = showMembers;
exports.addAlumni = addAlumni;
exports.delMembers = deleteMember;
