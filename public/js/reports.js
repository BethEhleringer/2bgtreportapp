// Getting references to our form and input

var selUserReports = {};
var selUser = {};

$(document).ready(function() {

  $.get("/api/user_data").then(function(users) {
    selUser = users;
    console.log(users)
  })
  
//Get the name of the user who is logged in and display it.
  $.get("/api/report_data").then(function(data) {
    selUserReports = data;
    console.log(data);
    for (var i = 1; i < selUserReports.length; i++){
      $("#user-reports").append(
        "<tr><td>" + selUserReports[i].UserId + "</td><td>" + moment(selUserReports[i].updateAt).format("MMM DD, YYYY") + "</td><td>" + selUserReports[i].pers_pr_req + "</td></tr>"
      )
    }
   
});
});
