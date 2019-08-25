// Getting references to our form and input
var userId
var selUserReports = {};
//var selUser = {};
var selUser
var selUserForm = $("#selUser");
var memberSelect = $("#member");
var submittedReports = 0;
 /* var selUser = {
    UserId: $("#member").val().trim(),
     };*/
    // var selUser = $("#member").val().trim();

//I NEED TO HAVE A FUNCTION THAT DETERMINES WHETHER OR NOT THE USER HAS SUBMITTED A REPORT.
$(document).ready(function() {
  

    
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.first_name);
    $(".member-id").text(data.id);
  
  });

 /* $.get("/api/last_report").then(function(data) {
    $(".last-report-date").text(moment(data[0].createdAt).format("hh:mm A, MMM DD, YYYY"));
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log("&&&&", data);
  }); */
lastDate();

// Adding an event listener for when the form is submitted

// When form is submitted, 
function handleFormSubmit(event) {
  event.preventDefault();
  var SelUser = memberSelect.val();

  //function for showing reports of selected member


  // end function for showing reports of selected member

  console.log("Which user was selected? ", SelUser);
  return SelUser
}

$(showRep).on("submit", handleFormTwoSubmit);

//When form is submitted,
function handleFormTwoSubmit(event) {
  event.preventDefault();
  showReports();
}

    // A function to get Members and then render our list of Members
  function getMembers() {
    $.get("/api/members", renderMemberList);
  }
  // Function to either render a list of members, or if there are none, direct the user to the page
  // to create an member first
  function renderMemberList(data) {
    if (!data.length) {
      window.location.href = "/members";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createMemberRow(data[i]));
    }
    memberSelect.empty();
    console.log(rowsToAdd);
    console.log(memberSelect);
    memberSelect.append(rowsToAdd);
    memberSelect.val(userId);
    console.log("I selected ", memberSelect, "!!!")
  }

  // Creates the member options in the dropdown
  function createMemberRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.id + " " + user.first_name + " " + user.last_name);
    return listOption;
  }

  getMembers();



  $.get("/api/user_data").then(function(users) {
    selUser = users;
    console.log(users)
  })
  
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
    } else {}
   }
   });
};

function lastDate() {
  $.get("/api/report_data").then(function(data) {
    //$.get("/api/last_report").then(function(data) {
     console.log("KJIHGFEDCBA")
     //console.log(selUser.id)
     console.log("*******************")
     console.log(data)
     console.log("??????<<<<<<<<<<<<???????????")
    selUserReports = data;
    UserId = memberSelect.val;
    for (var i = 1; i < selUserReports.length; i++){
      if (selUserReports[i].UserId === selUser.id) {
//THIS IS WHERE I NEED TO PUSH EACH VALUE THAT MEETS THE ABOVE CRITERIA INTO AN ARRAY SO I CAN 
//COUNT THE LENGTH TO MAKE SURE IT IS NOT -1 AND IF IT IS -1 THEN HAVE A DIFFERENT MESSAGE.
submittedReports = (submittedReports + 1);
console.log (submittedReports);
$(".last-report-date").text(
        moment(selUserReports[i].createdAt).format("HH:MM, MMM DD, YYYY")
      )
    
      console.log("selUserReports.length= ", selUserReports.length)
    } else {}
   }
   console.log("Submitted reports = " + submittedReports)
   if (submittedReports === 0) {$(".last-report-date").text("You haven't submitted any reports!")}
   });
};

});