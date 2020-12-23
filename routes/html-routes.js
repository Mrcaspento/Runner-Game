// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  app.get("/runnerGame", isAuthenticated, function(req, res) {
    res.render("runnerGame");
  });

  app.get("/scores", isAuthenticated, function(req, res) {
    const username = req.user.username;
    db.Score.findAll({ where: { UserId: req.user.id } }).then(function(
      results
    ) {
      const scores = JSON.parse(JSON.stringify(results));
      console.log(results);
      res.render("scores", { username, scores });
    });
  });
};
