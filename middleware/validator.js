const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const HttpError = require("./../models/HttpError");
module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.access_token_key);
    res.locals.userData = {
      userEmail: decodedToken.username,
      access: decodedToken.access,
    };

    //validity check
    var user = await User.findOne({email: { $regex: decodedToken.username, $options: 'i' }}).exec()
    if(!user.isvalid){
      const error = new HttpError("Verification Error!", 403);
      return next(error);
    }
    req.user = user
    next();
  } catch (err) {
    const error = new HttpError("Verification failed!", 403);
    console.log(err);
    return next(error);
  }
};
