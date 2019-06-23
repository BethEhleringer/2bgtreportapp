// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  app.get("/memberreports", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/memberreports.html"));
  });

  app.get("/temp", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/temp.html"));
  });
/*
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/reportentry.html");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
*/
//
app.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/memberreports.html");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/memberreports");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
 app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  }); 

  app.get("/reportentry", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reportentry.html"));
  });

  app.get("/reports", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reports.html"));
  })

};
