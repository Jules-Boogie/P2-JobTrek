var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  app.get("/members/resume", isAuthenticated,function (req, res) {
    // console.log(req.user);
    db.Resume.findAll().then(function (data) {
      // console.log("printing all from resume table", data[0])
      res.render("resume", {
        resume: data
      });
    });
  });

  app.get("/api/resume/find/:one", isAuthenticated,function (req, res) {
    
    let view = req.params.one
    console.log("from ajax",view)
    db.Resume.findOne(
      {
      where:{id:view,}}
      ).then(function(data){
      console.log(view,"find one:" ,data.dataValues)
      // res.render("resume", {one: data});
      res.json(data.dataValues);
   });
  });

  // this is added by kasey to populate dropdown lists
  app.get("/api/resume", function (req, res) {
    // Otherwise send back 
    // console.log("At /api/resume GET...")
    db.Resume.findAll({
      where: {
        user_id: 1
      }
    }).then(function (dbResume) {
      res.json(dbResume);
    });
  });

  // app.get("/api/resume/id", function (req, res) {
  //   db.resume.findOne().then(function(data){
  //   res.json(data);
  //  });

 

  app.post("/api/resume/create", isAuthenticated,function (req, res) {
    console.log("I got called for create")
    let resumeDate;
    if (req.body.date == null || eq.body.date == undefined) {
      resumeDate = Date.now();
    } else {
      resumeDate = req.body.date;
    }

    let newResumeObject = {

      // user_id : req.user.id,
      user_id: req.user.id,
      star: true,
      fileName: req.body.fileName,
      date: resumeDate,
      role: req.body.role,
      notes: req.body.note,
      fileLocation: req.body.fileLocation

    }
    // console.log("create objec", newResumeObject);
    db.Resume.create(newResumeObject).then(function () { })

  });

  app.put("/api/resume/update/star", isAuthenticated,function (req, res) {

    let starchange = req.body.starValue;
    if (starchange == "true") {
      starchange = false;
      console.log("here")
    } else {
      starchange = true;
    }
    // console.log(req.body.starValue, starchange)
    db.Resume.update({ star: starchange },
      {
        where: {
          id: req.body.starId
        }
      }).then(function (dbResume) {
        res.json(dbResume)
      })
  });

  app.put("/api/resume/update/alldata", isAuthenticated,function (req, res) {

    let recordId= req.body.idcard;
    // console.log("id ", recordId)
    let cardObject = {
            fileName:req.body.resumeTitle,
            role:req.body.cardrole,
            date:req.body.creationdate,
            notes:req.body.specialnotes,
            fileLocation:req.body.filelocation
    }

    // console.log("recordId",recordId, cardObject)
    db.Resume.update(cardObject,
      {
        where: {
          id: recordId
        }
      }).then(function (dbResume) {
        res.json(dbResume)
      })
  });




  app.delete("/api/resume/delete", isAuthenticated,function (req, res) {
    // add conditions not to delete if other job applications are linked 
    // this specific resume
    db.Resume.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(function (dbResume) {
        res.json(dbResume);
      });
  })

}