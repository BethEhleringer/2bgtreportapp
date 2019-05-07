// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      position: req.body.position,
      area: req.body.area,
      country: req.body.country
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        first_name: req.user.first_name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //route for filing a report
  app.post("/api/reportentry", function(req, res) {
    console.log(req.body);
    db.Report.create({
      pers_spir: req.body.pers_spir,
      pers_emot: req.body.pers_emot,
      pers_health: req.body.pers_health,
     pers_pr_req: req.body.pers_pr_req,
      UserId: req.body.UserId
    }).then(function() {
      res.redirect(307, "/api/members");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  //route for getting all reports
  app.get("/api/report_data", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    
    db.Report.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbReport) {
        res.json(dbReport);
    });
    
  });

  // get route for retrieving all reports from the current user

  // get value for current userid

  // show report data where userid === db.User.id


  

  // get route for retrieving a single report
  app.get("/api/reports/:id", function(req, res) {
      // Here we add an "include" propoerty to our options in our findOne query
      //  We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.User
      db.Report.findOne({
          where: {
              id: req.params.id
          },
          include: [db.User]
      }).then(function(dbReport) {
          res.json(dbReport);
      });
  });

  app.get("/api/members", function(req, res) {
    db.User.findAll({
      include: [db.Report]
    }).then(function(dbMember) {
      res.json(dbMember);
    });
  });

  

  

};
