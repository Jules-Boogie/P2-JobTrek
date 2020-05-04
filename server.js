// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var moment = require('moment');
moment().format();

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3500;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//app.use(express.static("public"));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  helpers: require('./config/handlebars-helpers.js').helpers
}));
app.set("view engine", "handlebars");
//app.set("views", __dirname, "views")



// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/api-routes-resume.js")(app);
require("./routes/api-routes-task.js")(app);
require("./routes/api-routes-contactlog.js")(app);
require("./routes/jobboard-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {

  //  let job = {

// "development": {
  //   "username": "bfb91052f0ec07",
  //   "password": "57dea6b6",
  //   "database": "heroku_6e860b37685e628",
  //   "host": "us-cdbr-east-06.cleardb.net",
  //   "dialect": "mysql"
  // },

  //           user_id: 1,
  //           job_title: "developer",
  //           description: "description",
  //           requirement: "requirement",
  //           location: "location",
  //           status:"status",
  //           company:"company", 
  //           notes: "notes",
  //           url: "www.jobtrek.com"

  //  }

  app.listen(PORT, function () {
    console.log(`==> Listening on port %s. Visit http://localhost:%s/ in your browser.`, PORT, PORT);
  });
});
