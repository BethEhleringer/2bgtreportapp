// Getting references to our form and input
var reportEntryForm = $("form.reportentry");
var persspirInput = $("input#persspir-input");
var persemotInput = $("input#persemot-input");
var pershealthInput = $("input#pershealth-input");
var persprreqInput = $("input#persprreq-input");
// The variable below holds the input from the hidden field.
var UserId = $("input#UserId");
//var userid = $("#user");
var currentUser = {};
//var UserId = currentUser.id

$(document).ready(function() {

  
//Get the name of the user who is logged in and display it.
  $.get("/api/user_data").then(function(data) {
    currentUser = data;
    $(".member-name").text(currentUser.first_name);
        console.log(currentUser);
    $("<input>").attr({
      type:"hidden",
      id: UserId,
      name: UserId
    }).appendTo(".report-entry")
  });
  
  
  //NOTE: How can I pass data.first_name and data.id to outside of the function so that 
  //I can save it in the 
  //GET USERID
 /* function getUserId() {
    currentUser 
    var queryUrl;
    queryUrl = "/api/user_data";
    $.get(queryUrl, function(data) {
      userid = data.id
    });
  }
  getUserId();
  console.log(userid)*/

  



//IMPORTANT! LOOK AT 3GTPROTO/PUBLIC/JS/REPORTENTRY.JS
// FOR HOW TO GET USER ID


 //submit button
  reportEntryForm.on("submit", function(event) {
    event.preventDefault();
    //capture the selected answers from radio buttons
    var pers_spir = $("input[name=pers_spir]:checked").val();

    var reportData = {
      pers_spir: pers_spir,
      //pers_spir: persspirInput.val(),
      pers_emot: persemotInput.val(),
     pers_health: pershealthInput.val(),
     pers_pr_req: persprreqInput.val(),
     UserId: UserId
    };
    console.log("reportData captured");
    
    console.log(reportData.pers_pr_req)
    console.log("User ID: ", currentUser.id)
    

    if (!reportData.pers_spir || !reportData.pers_emot || !reportData.pers_health) {
      return;
    }
    // If we have an entry for pers_spir, run the signUpUser function
    //enterReport(reportData.pers_spir, reportData.pers_emot, reportData.pers_health, reportData.pers_pr_req);
    enterReport(reportData.pers_spir, reportData.pers_emot, reportData.pers_health, reportData.pers_pr_req, reportData.UserId);
    persspirInput.val("");
    persemotInput.val("");
    pershealthInput.val("");
    persprreqInput;
    UserId;
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function enterReport(pers_spir, pers_emot, pers_health, pers_pr_req, UserId) {
    var UserId = currentUser.id;
   // function enterReport(pers_spir, pers_emot, pers_health, pers_pr_req) {
    $.post("/api/reportentry", {
      pers_spir: pers_spir,
     pers_emot: pers_emot,
     pers_health: pers_health,
     pers_pr_req: pers_pr_req,
     UserId: UserId
      
    }).then(function(data) {
      console.log("abcde")
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
