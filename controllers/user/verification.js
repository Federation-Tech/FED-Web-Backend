const jwt = require("jsonwebtoken");
const db = require("../../models/user-model");
const mailer = require("../../mailer/mailer");

async function verfication(req, res) {
  console.log("verification request received");

  var token = req.params.token;

  var vemail = await jwt.verify(token, process.env.verification_token_key);

  await db.findOneAndUpdate({ email: vemail }, { isvalid: true });

  res.send(
    `<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="kiit, fed, tbi, entrepreneurship, entrepreneur, society, federation, university">
        <meta name="description" content="The Federation of Entrepreneurship Development is the student body of KIIT TBI which aims to bring all ideas, potential startups under one umbrella.">
        <link rel="icon" type="image/x-icon" href="https://uploads-ssl.webflow.com/629d87f593841156e4e0d9a4/62eeaa9927e6aea4ff13590e_FedLogo.png" />
        <title>Federation of Entrepreneurship Development</title>
        <style>
            @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
    
            body {
                background-color: black;
                color: white;
                font-family: 'Rubik';
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 5%;
            }
    
            .email {
                width: 90px;
            }
    
            .container {
                margin: 5%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            .heading {
                font-family: "Rubik", sans-serif;
                font-size: 50px;
                line-height: 150%;
                letter-spacing: 0.005em;
                display: flex;
                justify-content: space-evenly;
            }
    
            .heading span {
                padding-left: 5%;
                color: #f45725;
            }
    
            .heading svg {
                width: 15%;
            }
    
            .desc {
                /* align-items: center; */
                text-align: center;
                font-family: "Manrope", sans-serif;
                font-size: 21px;
                letter-spacing: 0.005em;
                padding-bottom: 5%;
            }
    
            a {
                color: white;
            }
    
            a:hover {
                color: #f45725;
            }
    
            @media(max-width: 630px) {
                .heading {
                    font-size: 40px;
                }
    
                .desc {
                    font-size: 18px;
                }
            }
    
            @media(max-width: 480px) {
                .email {
                    width: 20%;
                }
    
                .heading {
                    font-size: 30px;
                }
    
                .desc {
                    font-size: 14px;
                }
            }
    
            @media(max-width: 480px) {
                .email {
                    width: 20%;
                }
    
                .heading {
                    font-size: 25px;
                }
    
                .desc {
                    font-size: 14px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <svg class="email" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="Layer_1" x="0px" y="0px" viewBox="0 0 117.72 117.72" style="enable-background:new 0 0 117.72 117.72"
                xml:space="preserve">
                <style type="text/css">
                    .st0 {
                        fill: #01A601;
                    }
                </style>
                <g>
                    <path class="st0"
                        d="M58.86,0c9.13,0,17.77,2.08,25.49,5.79c-3.16,2.5-6.09,4.9-8.82,7.21c-5.2-1.89-10.81-2.92-16.66-2.92 c-13.47,0-25.67,5.46-34.49,14.29c-8.83,8.83-14.29,21.02-14.29,34.49c0,13.47,5.46,25.66,14.29,34.49 c8.83,8.83,21.02,14.29,34.49,14.29s25.67-5.46,34.49-14.29c8.83-8.83,14.29-21.02,14.29-34.49c0-3.2-0.31-6.34-0.9-9.37 c2.53-3.3,5.12-6.59,7.77-9.85c2.08,6.02,3.21,12.49,3.21,19.22c0,16.25-6.59,30.97-17.24,41.62 c-10.65,10.65-25.37,17.24-41.62,17.24c-16.25,0-30.97-6.59-41.62-17.24C6.59,89.83,0,75.11,0,58.86 c0-16.25,6.59-30.97,17.24-41.62S42.61,0,58.86,0L58.86,0z M31.44,49.19L45.8,49l1.07,0.28c2.9,1.67,5.63,3.58,8.18,5.74 c1.84,1.56,3.6,3.26,5.27,5.1c5.15-8.29,10.64-15.9,16.44-22.9c6.35-7.67,13.09-14.63,20.17-20.98l1.4-0.54H114l-3.16,3.51 C101.13,30,92.32,41.15,84.36,52.65C76.4,64.16,69.28,76.04,62.95,88.27l-1.97,3.8l-1.81-3.87c-3.34-7.17-7.34-13.75-12.11-19.63 c-4.77-5.88-10.32-11.1-16.79-15.54L31.44,49.19L31.44,49.19z" />
                </g>
            </svg>
            <div class="heading">
                <h1 class="heading">Email <span> Verification</span>
                </h1>
            </div>
            <div class="desc">
                Great !! Your email has been verified.You can now <a
                    href="http://localhost:5173/Login"><span>Login</span></a>
                with your new account
            </div>
        </div>
    
    </body>
    
    </html>`
  );
}

async function sendverficationmail(email, name) {
  var mail = {
    to: email,
    subject: "Verify Your Mail Please",
    html: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
    </head>
    <body>
        <h1>Dear User,</h1>
        <p>Thank you for creating an account with FED KIIT. We are excited to have you as a valued supporter of our community. To ensure the security of your account and provide you with the best experience, we kindly request your cooperation in verifying your email address.</p>
        <p>To complete the verification process, please click on the link below:</p>
        <p><a href='${
          process.env.server_address +
          "/auth/verification/" +
          jwt.sign(email, process.env.verification_token_key)
        }'>Verify Email Address</a></p>
        <p>Thank you for your cooperation. We look forward to serving you and providing you with a seamless experience on our platform.</p>
        <p>Connect with us now on:</p>
        <ul>
            <li><a href="https://instagram.com/fedkiit?igshid=MzRlODBiNWFlZA==">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/fedkiit/">LinkedIn</a></li>
            <li><a href="https://youtube.com/@federationkiit">YouTube</a></li>
        </ul>
        <p>Best regards,</p>
        <p>Team FED</p>
    </body>
    </html>`,
  };

  console.log(await mailer.sendMail(mail));
}

exports.verify = verfication;
exports.mail = sendverficationmail;
