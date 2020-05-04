var db = require("../models");
// var passport = require("../config/passport");
module.exports = function (app) {


  //--- api functions for contactlog
  // need get(read), post(create), put (update), and delete

  app.get("/api/contactlog", function (req, res) {
    // Otherwise send back 
    console.log("At /api/contactlog GET...")
    // console.log(req)
    db.Contact_Log.findAll({
      where: {
        // only this user's items, not all...
        // need where... 
        user_id: req.user.id
      }
    }).then(function (dbcontactlog) {
      // We locate companies
      // console.log('/api/contactlog GET', dbCompany)
      res.json(dbcontactlog);
    });
  });

  app.get("/api/contactlogbyjob/:id", function (req, res) {
    // Otherwise send back 
    console.log("At /api/contactlogbyjob GET...")
    // console.log(req)
    db.Contact_Log.findAll({
      where: {
        // only this user's items, not all...
        // need where... 
        user_id: req.user.id,
        job_id: req.params.id
      }
    }).then(function (dbcontactlog) {
      // We locate companies
      // console.log('/api/contactlog GET', dbCompany)
      res.json(dbcontactlog);
    });
  });

  app.get("/api/contactlogbycontact/:id", function (req, res) {
    // Otherwise send back 
    console.log("At /api/contactlogbycontact GET...")
    // console.log(req)
    db.Contact_Log.findAll({
      where: {
        // only this user's items, not all...
        // need where... 
        user_id: req.user.id,
        contact_id: req.params.id
      }
    }).then(function (dbcontactlog) {
      // We locate companies
      // console.log('/api/contactlog GET', dbCompany)
      res.json(dbcontactlog);
    });
  });

  //create
  app.post("/api/contactlog", function (req, res) {
    console.log('/api/contactlog POST')
    //, " ", req.body)
    db.Contact_Log.create({
      user_id: req.user.id,
      job_id: req.body.job_id,
      contact_id: req.body.contact_id,
      note: req.body.note,
      datestamp: req.body.datestamp
    })
      .then(newcontactlog => {
        res.json(newcontactlog)
      })
      .catch(err => {
        throw err
      })
    // if (err) throw err;
  });

  //update
  app.put("/api/contactlog", function (req, res) {
    console.log('/api/contactlog PUT')
    //, " ", req.body)
    db.Contact_Log.findOne({
      where: {
        user_id: req.user.id,
        id: req.body.id
      }
    }).then((updatecontactlog) => {
      updatecontactlog.update({
        user_id: req.user.id,
        job_id: req.body.job_id,
        contact_id: req.body.contact_id,
        note: req.body.note,
        datestamp: req.body.datestamp
      })
        .then(updatedcontactlog => {
          res.json(updatedcontactlog)
        })
        .catch(err => {
          throw err
        })
    })
  });

  app.delete("/api/contactlog", function (req, res) {
    console.log('/api/contactlog DELETE', " ", req.body)
    db.Contact_Log.destroy({
      // id:
      where: {
        user_id: req.user.id,
        id: req.body.id
      }
    })
      .then(deletedcontactlog => {
        res.json(deletedcontactlog)
      })
      .catch(err => {
        // throw err;
        throw err
      })
  });

}