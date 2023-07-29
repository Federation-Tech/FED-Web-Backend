const jwt = require("jsonwebtoken");
const db = require("../../models/user-model");
const mailer = require("../../mailer/mailer");
const path = require("path");
const userModel = require("../../models/user-model");
const { log } = require("console");
const HttpError = require("../../models/HttpError");
var error = new HttpError();
error.name = "verification";

async function verfication(req, res) {
  try {
    console.log("verification request received");

    var token = req.params.token;

    var vemail = await jwt.verify(token, process.env.verification_token_key);

    await db.findOneAndUpdate({ email: vemail }, { isvalid: true });
    res.sendFile(
      path.join(__dirname, "../../html-files", "verified", "index.html")
    );
  } catch (err) {
    next(error);
  }
}

async function sendverficationmail(email, name) {
  var mail = {
    to: email,
    subject: "Verify Your Mail Please",
    html: `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <link
      href="https://fonts.googleapis.com/css?family=Poppins"
      rel="stylesheet"
    />
    <table>
      <tr>
        <td>
          <img
            width="100%"
            src="https://uploads-ssl.webflow.com/64ac127c9ddbf3f3a5b1b180/64ac1308de87a793459f627a_Header.png"
            alt=""
          />
        </td>
      </tr>
      <tr>
        <td>
          <div
            class="smallrect"
            style="position: absolute; width: 100%; background: #ff451c"
          >
            <p
              class="title"
              style="
                width: 100%;
                height: 50px;
                top: 80px;
                font-family: 'Poppins';
                font-weight: 600;
                font-size: 33.3084px;
                line-height: 50px;
                align-items: center;
                color: #ffffff;
                text-align: center;
              "
            >
              Email Verification
            </p>
            <div
              class="white"
              style="
                width: 80%;
                background: #ffffff;
                margin-left: 10%;
                padding: 20px;
              "
            >
              <div
                class="hi"
                style="
                  width: 100%;
                  height: 45px;
                  top: 30px;
                  font-family: 'Poppins';
                  font-weight: 600;
                  font-size: 30px;
                  line-height: 45px;
                  align-items: center;
                  text-align: center;
                  color: #000000;
                "
              >
                Hi User,
              </div>
              <div
                class="body1"
                style="
                  width: 100%;
                  top: 75px;
                  font-family: 'Poppins';
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 24px;
                  align-items: center;
                  text-align: center;
                  color: #000000;
                  margin-bottom: 20px;
                "
              >
                Thank you for creating an account in FED KIIT. We are excited to
                have you as a valued supporter of our community.
              </div>
              <div
                class="button"
                style="width: 100%; height: 68px; top: 200px; border: none"
              >
              <center>
              <a href='${
                process.env.server_address +
                "/auth/verification/" +
                jwt.sign(email, process.env.verification_token_key)
              }'>
                <button
                  style="
                    width: 360px;
                    height: 68px;
                    top: 200px;
                    background: #ff5e41;
                    align-items: center;
                    font-family: 'Poppins';
                    font-weight: 800;
                    font-size: 23px;
                    line-height: 34px;
                    text-align: center;
                    color: #ffffff;
                    cursor: pointer;
                    border:none;
                  "
                >
                  Verify Email
                </button>
                </a>
                </center>
              </div>
              <div
                class="body2"
                style="
                  width: 100%;
                  top: 300px;
                  font-family: 'Poppins';
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 24px;
                  align-items: center;
                  text-align: center;
                  color: #000000;
                  margin-top: 20px;
                "
              >
                To ensure the security of your account and provide you with best
                experience, we kindly request your cooperation in verifying your
                email address.
              </div>
              <div
                class="ty"
                style="
                  width: 100%;
                  top: 430px;
                  font-family: 'Poppins';
                  font-size: 16px;
                  line-height: 24px;
                  text-align: center;
                  color: #000000;
                  margin-top: 50px;
                "
              >
                Thanking You
              </div>
              <div
                class="regards"
                style="
                  width: 100%;
                  top: 450px;
                  font-family: 'Poppins';
                  font-size: 16px;
                  line-height: 24px;
                  text-align: center;
                  color: #000000;
                "
              >
                With Regards,
              </div>
              <div
                class="team"
                style="
                  width: 100%;
                  top: 480px;
                  font-family: 'Poppins';
                  font-size: 20px;
                  line-height: 24px;
                  text-align: center;
                  color: #000000;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
              >
                <b>Team FED</b>
              </div>
            </div>
            <img
              width="100%"
              src="https://uploads-ssl.webflow.com/64ac127c9ddbf3f3a5b1b180/64ac139c1316359d52abdee9_Group 1321.png"
            />
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };

  console.log(await mailer.sendMail(mail));
}

async function resendMail(req, res, next) {
  const { email } = req.params;
  try {
    var user = await userModel.find({ email: email }).exec();
    console.log(user);
    user.isvalid || sendverficationmail(user[0].email, user[0].name);
  } catch (err) {
    log(err);
    return res.status(500).send(err);
  }
  res.send("ok");
}
exports.verify = verfication;
exports.mail = sendverficationmail;
exports.resendMail = resendMail;
