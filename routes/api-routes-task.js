var db = require("../models");
// var passport = require("../config/passport");
module.exports = function (app) {


  //--- api functions for task
  // need get(read), post(create), put (update), and delete

  app.get("/api/task", function (req, res) {
    // Otherwise send back 
    console.log("At /api/task GET...")
    // console.log(req)
    db.Task.findAll({
      where: {
        // only this user's items, not all...
        // need where... 
        user_id: req.user.id
      }
    }).then(function (dbTask) {
      // We locate companies
      // console.log('/api/task GET', dbCompany)
      res.json(dbTask);
    });
  });


  //create
  app.post("/api/task", function (req, res) {
    console.log('/api/task POST')
    //, " ", req.body)
    db.Task.create({
      user_id: req.user.id,
      job_id: req.body.job_id,
      task: req.body.task,
      task_status: req.body.task_status,
      deadline: req.body.deadline
    })
      .then(newTask => {
        res.json(newTask)
      })
      .catch(err => {
        throw err
      })
    // if (err) throw err;
  });

  //update
  app.put("/api/task", function (req, res) {
    console.log('/api/task PUT')
    //, " ", req.body)
    db.Task.findOne({
      where: {
        user_id: req.user.id,
        id: req.body.id
      }
    }).then((updateTask) => {
      updateTask.update({
        user_id: req.user.id,
        job_id: req.body.job_id,
        task: req.body.task,
        task_status: req.body.task_status,
        deadline: req.body.deadline
      })
        .then(updatedTask => {
          res.json(updatedTask)
        })
        .catch(err => {
          throw err
        })
    })
  });

  app.delete("/api/task", function (req, res) {
    console.log('/api/task DELETE', " ", req.body)
    db.Task.destroy({
      // id:
      where: {
        user_id: req.user.id,
        id: req.body.id
      }
    })
      .then(deletedTask => {
        res.json(deletedTask)
      })
      .catch(err => {
        // throw err;
        throw err
      })
  });

}