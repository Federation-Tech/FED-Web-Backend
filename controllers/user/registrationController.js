const registrationSchema = require("../../models/user-model");
const gravatar = require("gravatar");
const verification = require("./verification");

//
const postData = async (req, res) => {
  console.log(`Registration request received for ${req.body.email}`);
  req.body.isvalid = false;
  req.body.access = 0;
  req.body.img = gravatar.url(req.body.email, { protocol: "https", s: "100" });
  const { email, password, name, access, extradata, isvalid, img } = req.body;
  if ((req.body.extradata = "" || !req.body.extradata)) {
    extradata = {};
  } else {
    if (email.includes("@")) {
      // change karo
      try {
        const data = new registrationSchema({
          // save use karo
          email,
          password,
          name,
          access,
          extradata,
          isvalid,
          img,
        });
        await data.save();
        verification.mail(email, name);
        res.status(200).json({ status: "ok" });
        console.log("registration done");
      } catch (err) {
        console.log("registration err " + err);
        res.status(400).json({ code: 2, error: err.message });
      }
    } else {
      console.log("invalid data entered sending err...");
      res.status(400).json({ code: 2, error: "invalid details entered" });
    }
  }
};

exports.register = postData;
