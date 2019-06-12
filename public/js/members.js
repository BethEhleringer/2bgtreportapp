$(document).ready(function() {
  
  var memberId

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.first_name);
    $(".member-id").text(data.id);
    memberId = data.id;
    console.log("memberId is " + memberId);
    //showUserReports();
    showReports();
    $.get("/api/report_data").then(function(crap) {
      console.log("!@#$%^&&*", db.Reports.UserId)
    });
    return memberId;
  });
  console.log("Now what is the member id? " + memberId )


  function showUserReports(){
    $.get("/api/report_data").then(function(data) {
      $("#member-report-data").text(data.last_name);
      console.log("****************************8")
      console.log(data.id)
      console.log(data.first_name + " " + data.last_name )
      console.log(data.Reports[0].UserId);
      for (var i = 0; i < data.Reports.length; i++) {
        console.log("*-*-*-" + data.Reports[i].createdAt + ": " + data.Reports[i].pers_pr_req)
      }
    })

  }

  //Get the name of the user who is logged in and display it.
function showReports() {
  console.log ("What's ", selUser.id, "???????")
  $("#user-reports").empty();
  $.get("/api/report_data").then(function(data) {
    selUserReports = data;
    UserId = memberSelect.val;
    console.log("member select is ", memberSelect.val);
    console.log(data);
    var SelUser
    for (var i = 1; i < selUserReports.length; i++){
      if (selUserReports[i].UserId === selUser.id) {
      //var SelUser = memberSelect.val();
    
     /* $("#user-reports").append(
        "<tr style='padding: 5px; color:#555; background-color:#FFF; background-image:none !important; border-bottom: solid 2px #666666;'><td style='padding: 10px;'>" + selUserReports[i].UserId + "</td><td style='padding: 10px; width:120px;'>" + moment(selUserReports[i].createdAt).format("MMM DD, YYYY") + "</td><td style='padding: 10px;'>" + selUserReports[i].pers_pr_req + "</td></tr>"
      ) */
   
      $("#user-reports").append(
        "<tr><td>" + selUserReports[i].UserId + "</td><td class='wrap' >" + moment(selUserReports[i].createdAt).format("MMM DD, YYYY") + "</td><td>" + selUserReports[i].pers_pr_req + "</td></tr>"
      )
    } else

    $("#user-reports").append("none")
  

    }
   
}

);
}


  /*$.get("/api/report_data").then(function(rdata) {
    $("#member-report-data").append(rdata.)
  }) */
});
