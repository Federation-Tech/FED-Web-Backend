const jwt = require("jsonwebtoken");
const User = require("../../models/user-model");
const { validationResult } = require("express-validator");

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
        return res.json({
          status: false,
          code: 4,
          message: "verfication error",
        });
      }
    } else {
      console.log(
        `FED-TECH -> User does not exists Requested by ${email} [Google Login] `
      );
      return res.json({
        status: false,
        code: 2,
        message: "User does not exists",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.googleSignUp = googleSignUp;
