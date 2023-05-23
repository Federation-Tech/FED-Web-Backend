const mailer = require("./../../mailer/mailer");
const User = require("../../models/user-model");
const db = require("../../models/forgetPassword");

const sendotp = async (req, res) => {
  const email = await User.findOne({
    email: req.body.email,
  });

  if (!email) {
    return res.status(401).json({ message: "Email doesn't exist" });
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const data = new db({
      email,
      otp,
    });
    await data.save();
    mailer.sendMail({
      to: email,
      subject: "Please verify your otp",
      text: `Please enter the following otp '${otp}' for proceeding forward`,
    });

    console.log("OTP sent");

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
