const mailer = require("./../../mailer/mailer");
const User = require("../../models/user-model");
const db = require("../../models/forgetPassword");

const sendotp = async (req, res) => {
  const result = await User.findOne({
    email: req.body.email,
  });
  console.log(req.body.email);

  // console.log(email);

  if (!result) {
    return res.status(401).json({ message: "Email doesn't exist" });
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    // const data = new db({
    //   email,
    //   otp,
    // });
    // await data.save();
    const email = result.email;

    await db.updateOne(
      { email: email },
      {
        $set: {
          email: email,
          otp: otp,
        },
      },
      { upsert: true }
    );

    mailer.sendMail({
      to: email,
      subject: "Please verify your otp",
      text: `Please enter the following otp '${otp}' for proceeding forward`,
    });

    // console.log("OTP sent");
    console.log("OTP sent: ", otp);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log("error: ", err);
    return res.status(400).json({ error: err.message });
  }
};

const verifyotp = async (req, res) => {
  console.log("verifictaion of otp");

  const result = await db
    .find({
      email: req.body.email,
    })
    .exec();

  if (!result[0]) {
    return res.status(401).json({ message: "Email invalid" });
  }

  if (req.body.otp === result[0].otp) {
    console.log("otp verified");
    console.log(result);

    return res.status(200).json({ status: "ok" });
  } else {
    console.log("incorrect otp");
    res.status(403).json({ error: "incorrect otp" });
  }
};

const resetpassword = async (req, res) => {
  const result = await User.findOne({
    email: req.body.email,
  });
  const email = result.email;

  if (!email) {
    return res.status(401).json({ message: "Email doesn't exist" });
  }
  try {
    // const otp = Math.floor(100000 + Math.random() * 900000);

    await User.updateOne(
      { email: email },
      {
        $set: {
          email: email,
          password: req.body.password,
          name: result.name,
          access: result.access,
          extradata: result.extradata,
          isvalid: result.isvalid,
          img: result.img,
          RollNumber: result.RollNumber,
          School: result.School,
          College: result.College,
          MobileNo: result.MobileNo,
          selected: result.selected,
        },
      },
      { upsert: true }
    );

    mailer.sendMail({
      to: email,
      subject: "Password Reset",
      text: "Your password has been successfully reset. Thank You",
    });

    console.log("Password Reset");

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.log("error: ", err);
    return res.status(400).json({ error: err.message });
  }
};

exports.sendotp = sendotp;
exports.verifyotp = verifyotp;
exports.resetpassword = resetpassword;
