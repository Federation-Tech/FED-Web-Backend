const User = require("../../models/user-model");

async function getdata(req, res) {
  try {
    var result = await User.find({ email: req.body.user.username }).exec();
    if (result[0]) {
      var data = {};
      data.email = result[0].email;
      data.name = result[0].name;
      data.profileimg = result[0].img;
      data.accesscode = result[0].access;
      res.json(data);
    } else {
      throw { errcode: 401, msg: { code: 2, msg: "Invalid email" } };
    }
  } catch (err) {
    res.status(err.errcode).json(err.msg);
    console.log(err);
  }
}

exports.getdata = getdata;
