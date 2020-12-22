$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const startInput = $("input#start");
  const scoreInput = $("input#score");

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });

  startInput.on("click", function() {
    $.post("/api/runnerGame")
      .then(function() {
        window.location.replace("/runnerGame");
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  scoreInput.on("click", function() {
    $.post("/api/scores")
      .then(function() {
        window.location.replace("/scores");
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
