const mailer = require("./../../mailer/mailer");
const User = require("../../models/user-model");
const db = require("../../models/forgetPassword");
const { validationResult } = require("express-validator");

const sendotp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const result = await User.findOne({
    email: { $regex: req.body.email, $options: 'i' },
  });

  if (!result) {
    return res.status(401).json({ message: "Email doesn't exist" });
  }
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const email = result.email;

    await db.updateOne(
      { email: { $regex: email, $options: 'i' } },
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
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #ffffff;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                  <td align="center" valign="top">
                      <img src="https://uploads-ssl.webflow.com/64ac127c9ddbf3f3a5b1b180/64ac1308de87a793459f627a_Header.png" alt="" style="max-width: 100%;">
                  </td>
              </tr>
              <tr>
                  <td align="center" valign="top" style="padding: 40px 10px;">
                      <div>
                          <img src="https://uploads-ssl.webflow.com/64ac127c9ddbf3f3a5b1b180/64ac53cb1ba4fe4430f66d96_image%20272.png" alt="" style="max-width: 100%;">
                      </div>
                      <div style="position: relative; margin-top: -220px;">
                          <p style="font-family: 'Rubik', sans-serif; font-size: 24px; font-weight: 400;top:40px; line-height: 28px; text-align: center; color: #000000;">
                              Hi user, I am Scarlett.
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 24px; font-weight: 400; line-height: 28px; text-align: center; color: #000000;">
                              Please enter the following
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 50px; font-weight: 400; line-height: 28px; text-align: center; color: #000000;">
                              OTP
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 50px; font-weight: 400; line-height: 28px; text-align: center; color: #000000;">
                              '${otp}'
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 24px; font-weight: 400; line-height: 28px; text-align: center; color: #000000;">
                              for proceeding forward.
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 22px; font-weight: 600; line-height: 26px; text-align: center; color: #000000; margin-top: 40px;">
                              Thanking You
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 22px; font-weight: 600; line-height: 26px; text-align: center; color: #000000;">
                              With Regards,
                          </p>
                          <p style="font-family: 'Rubik', sans-serif; font-size: 22px; font-weight: 600; line-height: 26px; text-align: center; color: #000000;">
                              Team FED
                          </p>
                      </div>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("verifictaion of otp");

  const result = await db
    .find({
      email: { $regex: req.body.email, $options: 'i' },
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const result = await User.findOne({
    email: { $regex: req.body.email, $options: 'i' },
  });

  if (!result) {
    return res.status(401).json({ message: "Email doesn't exist" });
  }
  try {
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const email = result.email;

    await User.updateOne(
      { email: { $regex: email, $options: 'i' } },
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
