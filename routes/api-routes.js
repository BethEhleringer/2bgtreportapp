// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var selectedPerson;

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/memberreports");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
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
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
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

  // Route for getting some data about our user to be used client side
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      username: req.user.username,
      email: req.user.email,
      password: req.user.password,
      position: req.user.position,
      area: req.user.area,
      country: req.user.country
    });
  }
  );
  //route for filing a report
  app.post("/api/reportentry", function (req, res) {
    console.log(req.body);
    db.Report.create({
      pers_spir: req.body.pers_spir,
      pers_emot: req.body.pers_emot,
      pers_health: req.body.pers_health,
      pers_pr_req: req.body.pers_pr_req,
      UserId: req.body.UserId
    }).then(function () {
      res.redirect(307, "/api/members");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  //route for getting all reports
  app.get("/api/report_data", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      req.query.user_id;
    }

    db.Report.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbReport) {
      res.json(dbReport);
    });

  });

  app.get("/api/last_report", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      req.query.user_id;
    }

    db.Report.findAll({
      limit: 1,
      where: query,
      order: [ [ 'createdAt', 'DESC']],
      include: [db.User]
    }).then(function (dbReport) {
      res.json(dbReport);
    });

  });

 /* app.get("/api/last_report", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      req.query.user_id;
    }

    db.Report.findAll({
      //limit: 1,
      where: query,
      include: [db.User]
     // order: [ [ 'createAt', 'DESC']]
    }).then(function (dbReport) {
      res.json(dbReport);
    });
  });
*/
  

  app.get("/api/asdfasdf", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      req.query.user_id;
    }

    db.Report.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbReport) {
      res.json(dbReport);
    });

  });

//***** */
  //route for getting all reports
  app.get("/api/report_data/:id", function (req, res) {

    db.Report.findAll({
      where: {
        id: req.params.id
      },

      include: [db.User]
    }).then(function (dbReport) {
      res.json(dbReport);
    });

  });



  // get route for retrieving all reports from the current user
  app.get("/api/users/:id", function (req, res) {

    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Report]
    }).then(function (dbUser) {
      res.json(dbUser);
    });

  });
  // get value for current userid

  // show report data where userid === db.User.id




  // get route for retrieving a single report
  app.get("/api/lmnop", function (req, res) {
    var SelUser;
    selectedPerson = SelUser;
    // Here we add an "include" propoerty to our options in our findOne query
    //  We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Report.findAll({
      where: {
        UserId: selectedPerson

      },
      include: [db.User]
    }).then(function (dbReport) {
      res.json(dbReport);
    });
  });


  // Get route for returning posts of a specific category
  app.get("/api/reports/UserId/:UserId", function (req, res) {
    db.Reports.findAll({
      where: { UserId: req.params.UserId }

    }); // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    then(function (dbReport) { res.json(dbReport) });
    //
  });
  
    // Get route for returning posts of a specific category
    app.get("/api/User/UserId/:UserId", function (req, res) {
      db.Reports.findAll({
        where: {
          UserId: req.params.UserId
        }
      })
        .then(function (dbReport) {
          res.json(dbReport);
        });
    });


    app.get("/api/members", function (req, res) {
      db.User.findAll({
        include: [db.Report]
      }).then(function (dbMember) {
        res.json(dbMember);
      });
    });

    app.get("/api/members/:id", function (req, res) {
      db.User.findOne({
        where: { id: req.params.id },
        include: [db.Report]
      }).then(function (dbMember) {
        res.json(dbMember);
      });
    });






  };
