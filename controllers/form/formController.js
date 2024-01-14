const formDb = require("../../models/form");
const HttpError = require("../../models/HttpError");
const userModel = require("../../models/user-model");

async function getUserForm(req,res,next){
  try{
    const form = await userModel.findById(req.user._id).select("regForm").exec()
    res.json(form.regForm)
  }catch(err){
    var error = new HttpError
    error.name = "formController"
    error.message = err
    next(error)
  }
}
async function getUserFormDetails(req,res,next){
  try{
    const form = await userModel.findById(req.user._id).select("regForm").exec()
    var final = []
    for(const formid of form.regForm){
      var formDetails = await formDb.findById(formid).select("title date img isTeam active event").populate("event").exec()
      final.push(formDetails)
    }  
    res.json(final.reverse())
  }catch(err){
    var error = new HttpError
    error.name = "formController"
    error.message = err
    next(error)
  }
}

async function getForm(req, res, next) {
  const { eventid } = req.query;
  try {
    const form = await formDb.find({ event: eventid }).exec();
    res.json(form);
  } catch (e) {
    var error = new HttpError();
    error.name = "formController"
    error.code = 500;
    error.message = "No data found";
  }
}


async function addForm(req, res, next) {
  const { title="", description="", amount=0, priority=0, formelement=[],upi="", event="", maxReg=0,isTeam=false,teamsize=0,img="",date="" } = req.body;
  const { access } = res.locals.userData;
  try {
    if (access == 0) {
      const updatedForm = new formDb({
        title,
        description,
        amount,
        upi,
        priority,
        formelement,
        event,
        maxReg,
        isTeam,
        teamsize,
        img,
        date,
        mail
      });
      await updatedForm.save();
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.name = "formController"
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    console.log(e)
    var error = new HttpError
    error.name = "formController"
    error.code = 400;
    error.message = "Invalid Data";
    next(error);
  }
}


async function updateForm(req, res, next) {
  const { title, description, amount, priority, formdata, formid,maxReg,event,isTeam,teamsize } = req.body;
  const { access } = res.locals.userData;
  try {
    if (access == 0) {
      const updatedForm = formDb.findByIdAndUpdate(formid,{
        title,
        description,
        amount,
        priority,
        formelement,
        event,
        maxReg,
        isTeam,
        teamsize
      });
      await updatedForm.save();
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.name = "formController"
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    var error = new HttpError
    error.name = "formController"
    error.code = 400;
    error.message = "Invalid Data";
    next(error);
  }
}


async function deleteForm(req, res, next) {
  const { formid } = req.query;
  const { access } = res.locals.userData;
  try {
    if (access == 0) {
      await formDb.findByIdAndDelete(formid)
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    var error = new HttpError
    error.name = "formController"
    error.code = 400;
    error.message = "Invalid Data";
    next(error);
  }
}

async function toggleForm(req, res, next) {
  const { formid } = req.query;
  const { access } = res.locals.userData;
  try {
    if (access == 0) {
      var {active} = await formDb.findById(formid).select(["active"])
      var result = await formDb.findByIdAndUpdate(formid,{active:!active})
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    var error = new HttpError
    error.name = "formController"
    error.code = 400;
    error.message = e;
    next(error);
  }
}


//public 
async function getactiveform(req,res,next){
  const { upcomming } = req.query
  try {
      var result = await formDb.find().limit(10).populate("event")
      res.json(result.reverse());
  } catch (e) {
    var error = new HttpError
    error.name = "formController" 
    error.code = 400;
    error.message = e;
    next(error);
  }
}


exports.addForm = addForm;
exports.getForm = getForm;
exports.updateForm = updateForm;
exports.deleteForm = deleteForm;
exports.toggleForm = toggleForm;
exports.getuserform = getUserForm;
exports.getuserformdetails = getUserFormDetails;
exports.getactiveform = getactiveform
