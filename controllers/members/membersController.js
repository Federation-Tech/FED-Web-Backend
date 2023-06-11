const { validationResult } = require("express-validator");
const User = require("../../models/user-model");
const showMembers = async (req, res) => {
  res.status(202).json("people");
};

const addMembers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, access, email, img } = req.body;

  try {
    res
      .status(202)
      .json({ name, email, access, img, isvalid: false, password: 123 });
  } catch (err) {
    console.log(err);
    res.status(505).json({ msg: "error", err });
  }
};

const deleteMember = async (req, res) => {
  try {
    var result = await User.findOne({ email: req.body.user });
    if (result.access == 0) {
      await User.updateOne(
        {
          $and: [{ email: req.body.email }, { access: { $not: { $eq: "0" } } }],
        },
        { isvalid: false }
      );
      res.status(200).json({ msg: "ok" });
    } else {
      res.status(403).json({ msg: "unauthorised" });
    }
  } catch (err) {
    res.status(403).json({ msg: "unauthorised", err });
  }
};

exports.addMembers = addMembers;
exports.showMembers = showMembers;
exports.delMembers = deleteMember;
