const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

function validate(req, res, next) {
  if (!req) next();
  jwt.verify(req.headers.authorization , process.env.access_token_key, async (err, user) => {
    if (err) {
      console.log("verification failed")
      return res.status(403).json({ code: 4 });
    }
    var result = await User.findOne({email:user.username})
    if(result.isvalid){
      req.body.user = user.username;
    }else{
      return res.status(403).json({ code: 4 });
    }
    next();
  });
}

exports.validate = validate;
