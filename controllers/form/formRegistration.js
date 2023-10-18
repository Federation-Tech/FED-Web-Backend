const { ObjectId } = require("mongodb");
const client = require("../../config/db").mongoClient;
const userDb = require("../../models/user-model");
const formDb = require("../../models/form");
const HttpError = require("../../models/HttpError");
const mailer = require("../../mailer/mailer")
const jwt = require("jsonwebtoken");

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
    var errormsg = undefined;
      //check if teamleader exists
      if(form.isTeam && req.body.teamleader != req.user.email){
        var teamleader = await userDb.findOne({email:{ $regex: req.body.teamleader, $options: 'i' }})
        validReg &&= (teamleader != null) //search if the user exists
        validReg &&=(teamleader.regForm).includes(form._id)

        var teamleaderReg = await client
        .db(form.event.title.replace(" ", "_"))
        .collection(form.title.replace(" ", "_"))
        .findOne({$and:[{user:teamleader._id},{"submision.teamleader":teamleader.email}]})
        validReg &&= teamleaderReg != null
        errormsg = errormsg?errormsg:(validReg?undefined:"team leader failed")
        //check if the team is full
        var teamcount = await client
        .db(form.event.title.replace(" ", "_"))
        .collection(form.title.replace(" ", "_"))
        .find({"submision.teamleader":req.body.teamleader})
        .toArray()
        validReg &&= teamcount.length < form.teamsize 
        errormsg = errormsg?errormsg:(validReg?undefined:"team size failed")
      }
    //check for lower priority form filled
    validReg &&= formUnderEventLessPriority.every((form) => {
      var result = false;
      user.regForm.every((regForm) => {
        if (regForm._id.toString() == form._id.toString()) {
          result = true;
        }
      });
      return result;
    });
    errormsg = errormsg?errormsg:(validReg?undefined:"Required forms not filled")
    validReg &&= user.regForm.every((element) => element._id != formid); //check for duplicate entry
    errormsg = errormsg?errormsg:(validReg?undefined:"Duplicate Entry")
    validReg &&= totalRegistrationUntillNow < form.maxReg; //check for max registration
    errormsg = errormsg?errormsg:(validReg?undefined:"Registration Full")
    validReg &&= user.access == 1; // check for participant only registrations
    errormsg = errormsg?errormsg:errormsg?errormsg:(validReg?undefined:"Invalid access")
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
      mailer.sendMail({
        to:req.user.email,
        subject:`Confirmation of ${form.title} Registration`,
        html:`Thank you for registering into our event ${form.title}. we have successfully received your details.<br><br>This is a system generated mail, final confirmation mail will be sent soon.`
      })
      if(form.isTeam && req.body.teamleader != req.user.email){
        const token = jwt.sign(
          {
            teamleader: teamleader.email,
            membertodelete: req.user.email,
            team:teamcount[0].submision.teamname,
            form:form.title,
            event:form.event.title
          },
          process.env.access_token_key
        );
        mailer.sendMail({
          to:teamleader.email,
          subject:`Team alert for ${form.title}`,
          html:`This is to inform you that ${req.user.name} have registered under your team ${teamcount[0].submision.teamname} using the email ${req.user.email}.
          <br><br><br>To Remove the member kindly click on the link below:<br>
          ${process.env.server_address}/form/deletemember?token=${token}
          <br><br><span valign="bottom">This is a system generated mail, final confirmation mail will be sent soon.<span>`
        })
      }
      res.send("ok");
    } else {
      var error = new HttpError();
      error.name = "formRegistration";
      error.message = errormsg;
      return next(error);
    }
  } catch (err) {
    //server error
    var error = new HttpError();
    error.name = "formRegistration";
    error.message = err;
    next(err)
  }
}

async function fetchRegistrations(req, res, next) {
  try {
    const { formid } = req.query;
    if (req.user.access == 0) {
      const form = await formDb.findById(formid).populate("event");
      var result = await client
        .db(form.event.title.replace(" ", "_"))
        .collection(form.title.replace(" ", "_"))
        .find();
      result = await result.toArray();
      var final = await Promise.all(
        result.map(async (registration) => {
          registration.userdata = await userDb
            .findById(registration.user)
            .select(
              "name email school college RollNumber MobileNo linkedin github extradata"
            );
          return registration;
        })
      );
      return res.json(final);
    } else {
      var error = new HttpError();
      error.name = "formRegistration";
      error.code = 403;
      error.message = "Permission Denied";
      throw "";
    }
  } catch (err) {
    var error = new HttpError();
    error.name = "formRegistration";
    error.message = err
    next(error);
  }
}
async function deleteMember(req,res,next){
  try {
    const token = req.query.token; 
    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }
    const decodedToken = jwt.verify(token, process.env.access_token_key);
    var tobedeleteuser = await userDb.findOne({email:decodedToken.membertodelete})
    var result = await client
    .db(decodedToken.event.replace(" ", "_"))
    .collection(decodedToken.form.replace(" ", "_"))
    .updateOne({user:tobedeleteuser._id},{$set:{"submision.teamleader":decodedToken.membertodelete,"submision.teamname":"N\A"}});
    if(result.modifiedCount == 0){
      return res.send("Member was already deleted")
    }
    mailer.sendMail({
      to:decodedToken.membertodelete,
      cc:decodedToken.teamleader,
      subject:`Team alert for ${decodedToken.form}`,
      html:`This is to inform you that ${tobedeleteuser.name} has been removed from the team ${decodedToken.team} by the team leader.
      <br><br>If you think this was an error kindly contact the FED through executives or mail us at fedkiit@gmail.com.
      <span valign="bottom">This is a system generated mail, final confirmation mail will be sent soon.<span>`
    })
    res.send("Member was deleted")
  } catch (err) {
    var error = new HttpError
    error.message = err
    error.name = "formregistration"
    next(error)
  }
}

async function verifyleader(req,res,next){
  const { teamleadermail, formid } = req.query;
  var validReg = true;
  var successmsg = "";
  var errormsg = undefined;
  console.log(teamleadermail)
  try {
    const form = await formDb.findById(formid).populate("event");
    var teamleader = await userDb.findOne({
      email:  teamleadermail ,
    });
    validReg &&= teamleader != null; //search if the user exists
    validReg &&= teamleader.regForm.includes(form._id);
    var teamleaderReg = teamleader != null ?await client
      .db(form.event.title.replace(" ", "_"))
      .collection(form.title.replace(" ", "_"))
      .findOne({
        $and: [
          { user: teamleader._id },
          { "submision.teamleader": teamleader.email },
        ],
      }):null;
    validReg &&= teamleaderReg != null;
    errormsg = errormsg
      ? errormsg
      : validReg
      ? undefined
      : "team leader not found";
    validReg && (successmsg = teamleaderReg.submision.teamname);
    //check if the team is full
    var teamcount = await client
      .db(form.event.title.replace(" ", "_"))
      .collection(form.title.replace(" ", "_"))
      .find({ "submision.teamleader": teamleadermail })
      .toArray();
    validReg &&= teamcount.length < form.teamsize;
    errormsg = errormsg?errormsg:(validReg?undefined:"team is full")

    if (validReg) {
      res.json({ validation: true, message: successmsg });
    } else {
      res.json({ validation: false, message: errormsg });
    }
  } catch (err) {
    var error = new HttpError();
    error.message = err;
    next(error);
  }
}


exports.register = registerForm;
exports.fetchRegistrations = fetchRegistrations;
exports.deleteMember = deleteMember;
exports.verifyleader = verifyleader;
