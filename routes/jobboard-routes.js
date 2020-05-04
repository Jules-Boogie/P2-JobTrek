
// html route to job board
//renders jobboard.handlebars
// api route to job board
// posts to database when new job has been added 
// gets 
var path = require("path")
var db = require("../models");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");


// HTML 

module.exports = function (app) {

    app.post("/api/signup", function (req, res) {
        db.user.create({
            email: req.body.email,
            password: req.body.password,
            role: "Job Seeker"
        }).then(function () {
            // console.log('/api/signup', " ", req.body)
            res.redirect(307, "/api/login");
        })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function (req, res) {
        res.json({
            email: req.user.email,
            id: req.user.id,
            role: req.user.role
        });
    });

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    app.get("/members", isAuthenticated, function (req, res) {
        var reqUser = req.user.id
        console.log("reqUser = ", reqUser)
        res.render("members", { reqUser: reqUser })
    });

    app.get("/members/jobboard", isAuthenticated,  function (req, res) {

        db.Job.findAll({
            user_id: req.user_id,
            where: { status: "wishlist" }
        }).then(function (wishlistData) {
            db.Job.findAll({
                user_id: req.user_id,
                where: { status: "applied" }
            }).then(function (appliedData) {
                db.Job.findAll({
                    user_id: req.user_id,
                    where: { status: "response" }
                }).then(function (responseData) {
                    db.Job.findAll({
                        user_id: req.user_id,
                        where: { status: "interview" }
                    }).then(function (interviewData) {
                        db.Job.findAll({
                            user_id: req.user_id,
                            where: { status: "offers" }
                        }).then(function (offersData) {
                            db.Job.findAll({
                                user_id: req.user_id,
                                where: { status: "rejected" }
                            }).then(function (rejectedData) {
                                res.render("jobboard", {
                                    wishlist: wishlistData,
                                    applied: appliedData,
                                    response: responseData,
                                    interview: interviewData,
                                    offers: offersData,
                                    rejected: rejectedData
                                })

                            })
                        })
                    })
                })
            })
        })
    })

    app.get("/members/jobinfo", function (req, res) {

        res.render("jobinfo")
    });

    
    // app.get("/api/jobboard", function (req, res) {


    //     db.Job.findAll({

    //         user_id: req.user.id
    //     }).then(function (dbJobboard) {

    //         res.json(dbJobboard);
    //     });
    // });


    app.get("/api/jobboard/resumeselect", isAuthenticated, function (req, res) {
        db.Resume.findAll({ user_id: req.user_id }

        ).then(function (data) {

            console.log(data)
            res.json(data)
        })
    });

    app.get("/api/jobboard/companyselect", isAuthenticated, function (req, res) {
        db.Company.findAll({ user_id: req.user_id }

        ).then(function (data) {
            console.log(data)
            res.json(data)
        })
    })

    app.get("/api/jobboard/taskselect", isAuthenticated, function (req, res) {
        db.Task.findAll({ user_id: req.user_id }
        ).then(function (data) {
            console.log(data)
            res.json(data)
        })
    })
    
    // app.get("/api/jobboard/company", function (req, res) {
    //     db.Company.findAll({
    //         where:{
    //             user_id: req.user.id
    //         }
    //          }

    //     ).then(function (data) {
    //         //res.json(data)
    //         console.log("companies" , data)
    //         res.render("addjob", { companies: data })

    //     })
    // })

    app.get("/api/jobboard/resume", isAuthenticated, function (req, res) {
        db.Resume.findAll({
            where:{
                user_id: req.user.id
            }
             }).then(function (data) {
           
          // res.json(data)
            res.render("addjob", { resumes: data })
            //console.log(data)
        })
    })


    app.get("/api/jobboard/task", isAuthenticated, function (req, res) {
        db.Task.findAll({
            where:{
                user_id: req.user.id
            }
             }).then(function (data) {
            
            //res.json(data)
            res.render("addjob", { tasks: data })
            //console.log(data)
        })
    })


    //create
    app.post("/api/jobboard", function(req, res){
        console.log("post method")
        var jobObject = {
            user_id: req.user.id,
            job_title: req.body.job_title,
            description: req.body.describe,
            requirement: req.body.require,
            location: req.body.locate,
            status: req.body.status.toLowerCase(),
            company:req.body.company,
            task:req.body.task,
            resume:req.body.resume,
            notes: req.body.note,
            url: req.body.jobUrl
        }
        console.log(jobObject)
        db.Job.create(jobObject).then(function (jobDB) {
            res.json(jobDB)
        })
    });


    // find one

    app.get("/api/jobboard/:id", function(req, res){

        let recordId = req.params.id;
        db.Job.findOne({
            where:{id:recordId}
        }).then(function(recordResult){

            res.json(recordResult.dataValues)
        });

    });





    //update
    app.put("/api/jobboard/change/:recordId", function (req, res) {

        let recId = req.params.recordId;
        console.log("here at update", recId)
        let objUpdate = {
            job_title: req.body.job_title,
            description: req.body.describe,
            requirement: req.body.require,
            location: req.body.locate,
            status:req.body.statusUpdate.toLowerCase(),
            company:req.body.company,
            task:req.body.task,
            resume:req.body.resume,
            notes: req.body.note,
            url: req.body.jobUrl
        }
        console.log("here is obj", objUpdate)
        db.Job.update(objUpdate, {
            where:{
                id:recId
            }
        }).then(function (responseSql) {
            console.log("updated???")
        })

        // db.Job.findOne({
        //     where: {
        //         id: req.params.recordId
        //     }
        // }).then((updateJob) => {
        //     updateJob.update({
        //         job_title: req.body.job_title,
        //         description: req.body.description,
        //         requirement: req.body.requirement,
        //         location: req.body.location,
        //         // company://company_id:ref
        //         // contact://contact_id:ref
        //         // resume:// resume_id:ref
        //         // status://status:ref
        //         notes: req.body.notes,
        //         url: req.body.url
        //     }).then(updatedJob => {
        //         res.json(updatedJob)
        //     })
        //         .catch(err => {
        //             throw err
        //         })
        // })
    });


    app.delete("/api/jobboard", function (req, res) {
        console.log("delete", req.body.jobId)
        db.Job.destroy({

            where: {
                id: req.body.jobId
            }
        }).then(deletedJob => {
            res.json(deletedJob)
        })
            .catch(err => {
                // throw err;
                throw err
            })
    });





}



