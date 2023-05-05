const jwt = require("jsonwebtoken");


function validate(req, res, next) {
  if (!req) next();
  jwt.verify(req.headers.auth_token , process.env.access_token_key, (err, user) => {
    if (err) {
      console.log("verification failed")
      return res.status(403).json({ code: 4 });
    }
    req.body.user = user;
    next();
  });
}

exports.validate = validate;
