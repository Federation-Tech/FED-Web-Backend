const formDb = require("../../models/form");
const HttpError = require("../../models/HttpError");
var error = new HttpError
error.name = "formController"

async function getForm(req, res, next) {
  const { eventid } = req.query;
  try {
    const form = await formDb.find({ event: eventid }).exec();
    res.json(form);
  } catch (e) {
    var error = new HttpError();
    error.code = 500;
    error.message = "No data found";
    error.name = "no data found";
  }
}


async function addForm(req, res, next) {
  const { title, description, amount, priority, formdata, event } = req.body;
  const { access } = res.locals.userData;
  console.log("Req->",req.body);
  console.log("Access->",access);
  try {
    if (access == "0") {
      const updatedForm = new formDb({
        title,
        description,
        amount,
        priority,
        formelement:formdata,
        event,
      });
      await updatedForm.save();
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    error.code = 400;
    error.message = "Invalid Data";
    next(error);
  }
}


async function updateForm(req, res, next) {
  const { title, description, amount, priority, formdata, formid } = req.body;
  const { access } = res.locals.userData;
  try {
    if (access == 0) {
      const updatedForm = new formDb.findByIdAndUpdate(formid,{
        title,
        description,
        amount,
        priority,
        formdata,
      });
      await updatedForm.save();
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
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
      formDb.findByIdAndDelete(formid)
      res.sendStatus(200);
    } else {
      const error = new HttpError();
      error.code = 403;
      error.message = "Permission Denied";
      next(error);
    }
  } catch (e) {
    error.code = 400;
    error.message = "Invalid Data";
    next(error);
  }
}

exports.addForm = addForm;
exports.getForm = getForm;
exports.updateForm = updateForm;
exports.deleteForm = deleteForm;
