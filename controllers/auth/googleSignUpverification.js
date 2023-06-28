const jwt = require("jsonwebtoken");
const userSchema = require("../../models/user-model");

async function googleSignUpVerification(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Email is ", req.body.email);

  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        {
          username: user.email,
          access: user.access,
        },
        process.env.access_token_key,
        { expiresIn: "86400s" } // one day
      );

      console.log("login success");

      user.isvalid = undefined;
      user["password"] = undefined;
      user["__v"] = undefined;

      res.status(202).json({ status: "ok", token: token, user });
    } else {
      return res.json({ code: 4, message: "User does not exists" });
    }
  } catch (err) {
    console.log(err);
  }
}

exports.googleSignUpVerification = googleSignUpVerification;
