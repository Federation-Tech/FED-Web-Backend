const userSchema = require("../../models/user-model");

const updateData = async (req, res) => {
  console.log(`Updation request received for ${req.body.email}`);
  try {
    const { email, name, RollNumber, School, College, MobileNo, selected } =
      req.body;

    if (email.includes("@") && email.includes(".")) {
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          email: email,
          name: name,
          MobileNo: MobileNo,
          RollNumber: RollNumber,
          School: School,
          College: College,
          selected: selected,
        },
      };

      const rslt = await userSchema.updateOne(filter, updateDoc, options);
      console.log(rslt);

      const response = await userSchema.findOne(filter, { _id: 0, __v: 0 });
      return res.status(200).json({ message: "ok", response });
    } else {
      return res.status(400).json({ code: 3 });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ code: 2 });
  }
};

exports.updateData = updateData;
