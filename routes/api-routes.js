// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

// var roles = require("../config/roles.js")

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // console.log('/api/login', " ", req.user)
    console.log("/api/login called apiroute")
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {

    // let test ={
    //   user_id:1, 
    //   star:true, 
    //   fileName : 'testName3', 
    //   date:Date.now(), 
    //   role:'software3'
    // }

    // db.Resume.create(test).then(()=>console.log("please print something")).catch(error => console.log(error));





    db.User.create({
      email: req.body.email,
      password: req.body.password,
      role: "Job Seeker"
    })
      .then(function () {
        // console.log('/api/signup', " ", req.body)
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // app.get("/admin", function (req, res) {
  //   if (!req.user) {
  //     // kick them back out
  //     req.logout();
  //     res.redirect("/");
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id,
  //       administrator: req.user.administrator
  //     });
  //   }
  // });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    // console.log('/api/user_data', " ", req.user)
    res.json({
      email: req.user.email,
      id: req.user.id,
      role: req.user.role
    });
  });
  //--- api functions for company
  // need get(read), post(create), put (update), and delete

  app.get("/api/company", function (req, res) {
    // Otherwise send back 
    console.log("At /api/company GET...")
    //console.log(req)
    // console.log(req)
    db.Company.findAll({
      where: {
        // only this user's items, not all...
        // need where... 
        user_id: req.user.id
      }
    }).then(function (dbCompany) {
      // We locate companies
      // console.log('/api/company GET', dbCompany)
      res.json(dbCompany);
    });
  });


  //create
  app.post("/api/company", function (req, res) {
    console.log('/api/company POST')
    //, " ", req.body)
    db.Company.create({
      user_id: req.body.user_id1,
      company: req.body.company,
      notes: req.body.notes,
      rating: parseFloat(req.body.rating)
    })
      .then(newCompany => {
        res.json(newCompany)
      })
      .catch(err => {
        throw err
      })
    // if (err) throw err;
  });

  //update
  app.put("/api/company", function (req, res) {
    console.log('/api/company PUT')
    //, " ", req.body)
    db.Company.findOne({
      where: {
        user_id: req.body.user_id1,
        id: req.body.id
      }
    }).then((updateCompany) => {
      updateCompany.update({
        user_id: req.body.user_id1,
        company: req.body.company,
        notes: req.body.notes,
        rating: parseFloat(req.body.rating)
      })
        .then(updatedCompany => {
          res.json(updatedCompany)
        })
        .catch(err => {
          throw err
        })
    })
  });

  app.delete("/api/company", function (req, res) {
    console.log('/api/company DELETE', " ", req.body)
    db.Company.destroy({
      // id:
      where: {
        user_id: req.body.user_id,
        id: req.body.id
      }
    })
      .then(deletedCompany => {
        res.json(deletedCompany)
      })
      .catch(err => {
        // throw err;
        throw err
      })
  });


  //-- api functions for contacts

  // need get(read), post(create), put (update), and delete

  app.get("/api/contact", function (req, res) {
    // Otherwise send back 
    console.log("At /api/contact GET...")
    //console.log(req)
    // console.log(req)
    db.Contact.findAll({
      where: {
        user_id: req.user.id
      }
    }).then(function (dbcontact) {
      // We locate companies
      // console.log('/api/contact GET', dbcontact)
      res.json(dbcontact);
    });
  });


  //create
  app.post("/api/contact", function (req, res) {
    console.log('/api/contact POST')
    //, " ", req.body)
    db.Contact.create({
      user_id: req.body.user_id1,
      name: req.body.name,
      title: req.body.title,
      company_id: req.body.company_id,
      contact1: req.body.contact1,
      contact2: req.body.contact2,
      notes: req.body.notes,
      rating: parseFloat(req.body.rating)
    })
      .then(newContact => {
        res.json(newContact)
      })
      .catch(err => {
        throw err
      })
    // if (err) throw err;
  });

  //update
  app.put("/api/contact", function (req, res) {
    console.log('/api/contact PUT')
    //, " ", req.body)
    db.Contact.findOne({
      where: {
        user_id: req.body.user_id1,
        id: req.body.id
      }
    }).then((updateContact) => {
      updateContact.update({
        user_id: req.body.user_id1,
        name: req.body.name,
        title: req.body.title,
        company_id: req.body.company_id,
        contact1: req.body.contact1,
        contact2: req.body.contact2,
        notes: req.body.notes,
        rating: parseFloat(req.body.rating)
      })
        .then(updatedContact => {
          res.json(updatedContact)
        })
        .catch(err => {
          throw err
        })
    })
  });

  app.delete("/api/contact", function (req, res) {
    console.log('/api/contact DELETE', " ", req.body)
    db.Contact.destroy({
      // id:
      where: {
        user_id: req.body.user_id,
        id: req.body.id
      }
    })
      .then(deletedContact => {
        res.json(deletedContact)
      })
      .catch(err => {
        // throw err;
        throw err
      })
  });




  //-- api functions for resumes. 


  // -- api functions for jobs
  // need getall(read), getone(read), post(create), put (update), and delete

  app.get("/api/job", function (req, res) {
    // Otherwise send back 
    console.log("At /api/job GET...")
    db.Job.findAll({
      where: {
        user_id: req.user.id,
      }
    }).then(function (dbJob) {
      res.json(dbJob);
    });
  });

  app.get("/api/job/:id", function (req, res) {
    // Otherwise send back 
    console.log("At /api/job/:id GET...")
    db.Job.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (dbJob) {
      // console.log(dbJob[0])
      res.json(dbJob[0]);
    });
  });

  //create
  app.post("/api/job", function (req, res) {
    console.log('/api/job POST')
    //, " ", req.body)
    db.Job.create({
      user_id: req.body.user_id1,
      job_title: req.body.jobtitle,
      description: req.body.description,
      requirement: req.body.requirement,
      location: req.body.location1,
      company_id: parseInt(req.body.company_id),
      contact_id: parseInt(req.body.contact_id),
      resume_id: parseInt(req.body.resume_id),
      status: req.body.status1,
      notes: req.body.notes,
      rating: parseFloat(req.body.rating)
    })
      .then(newJob => {
        res.json(newJob)
      })
      .catch(err => {
        throw err
      })
  });

  //update
  app.put("/api/job", function (req, res) {
    console.log('/api/job PUT')
    //, " ", req.body)
    db.Job.findOne({
      where: {
        user_id: req.body.user_id1,
        id: req.body.id
      }
    }).then((updateJob) => {
      updateJob.update({
        user_id: req.body.user_id1,
        job_title: req.body.jobtitle,
        description: req.body.description,
        requirement: req.body.requirement,
        location: req.body.location,
        company_id: req.body.company_id,
        contact_id: req.body.contact_id,
        resume_id: req.body.resume_id,
        status: req.body.status,
        notes: req.body.notes,
        rating: parseFloat(req.body.rating)
      })
        .then(updatedJob => {
          res.json(updatedJob)
        })
        .catch(err => {
          throw err
        })
    })
  });

  app.delete("/api/job", function (req, res) {
    console.log('/api/job DELETE', " ", req.body)
    db.Job.destroy({
      // id:
      where: {
        user_id: req.body.user_id,
        id: req.body.id
      }
    })
      .then(deletedJob => {
        res.json(deletedJob)
      })
      .catch(err => {
        // throw err;
        throw err
      })
  });

  //-- end of all apis
};

