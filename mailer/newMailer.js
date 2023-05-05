const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

const sendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;
  try {
    console.log(name, email, message);

    res.status(202).json({ message: "Send" });
  } catch (error) {
    console.log(error);
  }
};

const mailer = (name, email, message) => {
  try {
    var transporter = nodemailer.createTransport({
      // host: 'smtp.gmail',
      // port: 465,
      // secure: true,
      host: "smtp.ethereal.email",
      name: "google.com",
      service: "gmail",
      auth: {
        user: "noreply.fedkiit@gmail.com",
        pass: "yloejahwnqyuuqdn",
      },
    });

    var mailOptions = {
      from: "noreply.fedkiit@gmail.com",
      to: "noreply.fedkiit@gmail.com",
      subject: "Sending Email using Node.js for Password Updation",
      // text: otp
      html: `<div>
        <p>
          Name = ${name}
        <br>
          Email = ${email}
        </p>
        <br>
        Message = ${message}
                </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(304).send();
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send();
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json("Server Error");
  }
};

exports.sendEmail = sendEmail;
