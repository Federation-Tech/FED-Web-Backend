const userSchema = require("../../models/user-model");

async function googleSignUpVerification(req, res) {
  console.log("Email is ",req.body.email)
  try{
    const user = await userSchema.findOne({email: req.body.email});
    if(user){
      return res.status(200).json({code:1,email:user.email,password:user.password});
    }
    else{
      return res.json({ code:4,message: "User does not exists"});
    }
  }catch(err)
  {
    console.log(err)

  }
}

exports.googleSignUpVerification = googleSignUpVerification;
