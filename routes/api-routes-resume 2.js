var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  app.get("/members/resume", function (req, res) {
    // console.log(req.user);
    db.Resume.findAll().then(function (data) {
      console.log("printing all from resume table", data[0].dataValues)
      res.render("resume", {
        resume: data
      });

    });
  });

  // app.get("/api/resume/id", function (req, res) {
  //   db.resume.findOne().then(function(data){
  //   res.json(data);
  //  });

  // });

  app.post("/api/resume/create", function (req, res) {
    console.log("I got called")
    let resumeDate;
    if (req.body.date == null || eq.body.date == undefined) {
      resumeDate = Date.now();
    } else {
      resumeDate = req.body.date;
    }

    let newResumeObject = {

      // user_id : req.user.id,
      user_id: 1,
      star: false,
      fileName: req.body.fileName,
      date: resumeDate,
      role: req.body.role,
      notes: req.body.note,
      fileLocation: req.body.fileLocation

    }
    console.log("create objec", newResumeObject);
    db.Resume.create(newResumeObject).then(function () { })

  });

  app.put("/api/resume/update/star", function (req, res) {
   
    let starchange = req.body.starValue;
    if (starchange== "true") {
      starchange= false;
      console.log("here")
    } else {
      starchange = true;
    }
    console.log(req.body.starValue, starchange)
    db.Resume.update({ star: starchange },
      {
        where: {
          id: req.body.starId
        }
      }).then(function (dbResume) {
        res.json(dbResume)
       })
  });


  app.delete("/api/resume/delete", function (req,res){
    // add conditions not to delete if other job applications are linked 
    // this specific resume
    db.Resume.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(function(dbResume) {
        res.json(dbResume);
      });
  })

}