const jwt = require("jsonwebtoken");
const HttpError = require("./../models/HttpError");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.access_token_key);

    console.log(decodedToken);

    res.locals.userData = {
      userEmail: decodedToken.username,
      access: decodedToken.access,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    console.log(err);
    return next(error);
  }
};
