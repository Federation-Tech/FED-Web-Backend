const { ObjectId } = require("mongodb");
const client = require("../../config/db").mongoClient;
const userDb = require("../../models/user-model");
const formDb = require("../../models/form");
const HttpError = require("../../models/HttpError");
var error = new HttpError();
error.name = "formRegistration";

async function registerForm(req, res, next) {
  const { formid } = req.body;
  try {
    const form = await formDb.findById(formid).populate("event").exec();
    const totalRegistrationUntillNow = await client
      .db(form.event.title.replace(" ", "_"))
      .collection(form.title.replace(" ", "_"))
      .countDocuments();

    const reqUser = req.user;
    var validReg = true;
    var user = await userDb
      .findById(reqUser._id)
      .select("regForm access")
      .populate("regForm")
      .exec();
    var formUnderEventLessPriority = await formDb
      .find({
        $and: [{ event: form.event._id }, { priority: { $lt: form.priority } }],
      })
      .exec();

    //check for lower priority form filled
    validReg &&= formUnderEventLessPriority.every((form) => {
      var result = false;
      user.regForm.forEach((regForm) => {
        if (regForm._id.toString() == form._id.toString()) {
          result = true;
        }
      });
      return result;
    });
    validReg &&= user.regForm.every((element) => element._id != formid); //check for duplicate entry
    validReg &&= totalRegistrationUntillNow < form.maxReg; //check for max registration
    validReg &&= user.access == "1" // check for participant only registrations
    if (validReg) {
      var result = await client
        .db(form.event.title.replace(" ", "_"))
        .collection(form.title.replace(" ", "_"))
        .insertOne({
          submision: req.body,
          user: req.user._id,
        });
      await userDb.findByIdAndUpdate(reqUser._id, {
        $push: { regForm: formid },
      });
      res.send("ok");
    } else {
      error.message =
        "Either Duplicate or Previous Form Not Filled or Seats Full";
      return next(error);
    }
  } catch (err) {
    //server error
    next(err)
  }
}

async function fetchRegistrations(req,res,next){
  try{
    const {formid} = req.query
    if(req.user.access == 0){
      const form = await formDb.findById(formid).populate("event")
      var result = await client
        .db(form.event.title.replace(" ", "_"))
        .collection(form.title.replace(" ", "_"))
        .find()
      result = await result.toArray()
      var final = await Promise.all(result.map(async(registration)=>{
        registration.userdata = await userDb.findById(registration.user).select("name email school college RollNumber MobileNo linkedin github extradata")
        return registration
      }))
      return res.json(final)
    }else{
      error.code = 403
      error.message = "Permission Denied"
      throw ""
    }
  }catch(err){
    next(error)
  }

}
exports.register = registerForm;
exports.fetchRegistrations = fetchRegistrations
