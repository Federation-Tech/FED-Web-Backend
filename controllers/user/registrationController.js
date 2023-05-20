const registrationSchema = require("../../models/user-model");
const gravatar = require("gravatar");
const verification = require("./verification");
const User = require("../../models/user-model");

//
const postData = async (req, res) => {
  console.log(`Registration request received for ${req.body.Email}`);

  req.body.isvalid = false;
  req.body.access = 1;
  req.body.img = gravatar.url(
    req.body.email,
    { s: "100", r: "x", d: "retro" },
    true
  );
  const {
    Email,
    password,
    Name,
    access,
    extradata,
    isvalid,
    img,
    RollNumber,
    School,
    College,
    MobileNo,
    selected,
  } = req.body;
 

  const user = await User.findOne({ Email: Email });

  if ((req.body.extradata = "" || !req.body.extradata)) {
    req.body.extradata = {};
  }

  if (user) {
    console.log("User already exists");
    return res.status(400).json({ code: 1, message: "User already exists" });
  }
  if (Email.includes("@")) {
    try {
      const data = new registrationSchema({
        Email,
        password,
        Name,
        access,
        extradata,
        isvalid,
        img,
        RollNumber,
        School,
        College,
        MobileNo,
        selected
      });

      await data.save();

      verification.mail(Email, Name);

      console.log("registration done");

      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log("registration err " + err);
      return res.status(400).json({ code: 2, error: err.message });
    }
  } else {
    console.log("invalid data entered sending err...");
    res.status(400).json({ code: 2, error: "invalid details entered" });
  }
};

exports.register = postData;
