$(document).ready(function() {
  $.get("/api/user_data").then(function(info) {
    $(".player-name").text(info.username);
  });
});
