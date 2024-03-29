const mailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const oauth2client = new google.auth.OAuth2(
  process.env.clientid,
  process.env.clientsecret,
  process.env.redirecturi
);
oauth2client.setCredentials({ refresh_token: process.env.refreshtoken });

async function sendmail({
  name = "noreply",
  to,
  cc = "",
  bcc = "",
  subject = "",
  text = "",
  html = "",
  attachment = "",
}) {
  try {
    const accesstoken = await oauth2client.getAccessToken();
    // const transport = mailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "oauth2",
    //     user: "noreply.fedkiit@gmail.com",
    //     clientId: process.env.clientid,
    //     refreshToken: process.env.refreshtoken,
    //     accessToken: accesstoken,
    //     clientSecret: process.env.clientsecret,
    //   },
    // });
    var transport = mailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.app_password,
      },
    });
    const mailoption = {
      from: `${name}<noreply.fedkiit@gmail.com>`,
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      text: text,
      html: html,
      attachment: attachment,
    };
    var result = await transport.sendMail(mailoption);
    console.log("Email Sent to ",to,result)
    return result;
  } catch (error) {
    console.log("Email Sent Failes to ",to,error)
    return error;
  }
}

exports.sendMail = sendmail;
