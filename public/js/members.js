$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });
});

//   // make $ a shortcut for document.querySelector
//   const $ = document.querySelector.bind(document);

//   // when the user clicks 'save'
//   $("#save").addEventListener("click", () => {
//     // get the filename and data
//     const filename = $("#savefilename").value;
//     const data = $("#savedata").value;

//     // save
//     saveFile(filename, data, err => {
//       if (err) {
//         alert("failed to save: " + filename + "\n" + err);
//       } else {
//         alert("saved: " + filename);
//       }
//     });
//   });
//   // when the user clicks load
//   $("#load").addEventListener("click", () => {
//     // get the filename
//     const filename = $("#loadfilename").value;

//     // load
//     loadFile(filename, (err, data) => {
//       if (err) {
//         alert("failed to load: " + filename + "\n" + err);
//       } else {
//         $("#loaddata").value = data;
//         alert("loaded: " + filename);
//       }
//     });
//   });
//   function saveFile(filename, data, callback) {
//     doXhr(filename, "PUT", data, callback);
//   }
//   function loadFile(filename, callback) {
//     doXhr(filename, "GET", "", callback);
//   }
//   function doXhr(url, method, data, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         callback(null, xhr.responseText);
//       } else {
//         callback("Request failed.  Returned status of " + xhr.status);
//       }
//     };
//     xhr.send(data);
//   }
// });
