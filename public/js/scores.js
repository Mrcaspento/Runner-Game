$(document).ready(function() {
  app.post("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      res.json({
        score: req.user.score
      });
    }
  });

  $.get("/api/user_data").then(function(data) {
    $(".score").text(data.score);
  });
});
