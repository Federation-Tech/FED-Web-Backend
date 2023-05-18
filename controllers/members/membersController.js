const { validationResult } = require("express-validator");

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
    res.status(202).json({ name, access, email, img });
  } catch (err) {
    console.log(err);
    res.status(505).json({ msg: "error", err });
  }
};

exports.addMembers = addMembers;
exports.showMembers = showMembers;
