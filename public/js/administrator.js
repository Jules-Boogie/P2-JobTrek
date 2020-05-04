$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    if (data.administrator === 0) {
      // that's not admin level access
      window.location.replace("/");
    } else {
      $(".member-name").text(data.email);
    }
  });
});
