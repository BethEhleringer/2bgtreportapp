$(document).ready(function() {

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.first_name);
    return(data);
  
  });
 
  // Getting references to our form and input
  var reportEntryForm = $("form.reportentry");
  var persspirInput = $("input#persspir-input");
  var persemotInput = $("input#persemot-input");
 var pershealthInput = $("input#pershealth-input");
  var persprreqInput = $("input#persprreq-input");
  
// get the username so it can be  used in another function
console.log("User ID is: ", user_id);

// Finally, keep in mind that using "return" lets us
    // give something back to whomever called the function.
    var thirdFunction = function(qwerty) {
      return qwerty + exposed;
    };


    // Try to do things this way, instead of using console.log
    // inside of your functions.
    var qwerty = thirdFunction("Oh my! ");
    console.log("Qwerty:", qwerty);
    
function getUsername(){
  $.get("/api/user_data").then(function(data) {
    var currentname = data.id;
    console.log(currentname)
  });
  
};

getUsername();


  // When the signup button is clicked, we validate the email and password are not blank
  
  reportEntryForm.on("submit", function(event) {
    event.preventDefault();
    //capture the selected yes or no answers
    var pers_spir = $("input[name=pers_spir]:checked").val();
    var reportData = {
      pers_spir: pers_spir,
      //pers_spir: persspirInput.val(),
      pers_emot: persemotInput.val(),
     pers_health: pershealthInput.val(),
     pers_pr_req: persprreqInput.val(),

      
    };
    console.log("reportData captured");
    console.log("User Data: ", currentname)
    console.log(reportData.pers_pr_req)

    if (!reportData.pers_spir || !reportData.pers_emot || !reportData.pers_health) {
      return;
    }
    // If we have an entry for pers_spir, run the signUpUser function
    //enterReport(reportData.pers_spir, reportData.pers_emot, reportData.pers_health, reportData.pers_pr_req);
    enterReport(reportData.pers_spir, reportData.pers_emot, reportData.pers_health, reportData.pers_pr_req);
    persspirInput.val("");
    persemotInput.val("");
    pershealthInput.val("");
    persprreqInput;
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function enterReport(pers_spir, pers_emot, pers_health, pers_pr_req) {
   // function enterReport(pers_spir, pers_emot, pers_health, pers_pr_req) {
    $.post("/api/reportentry", {
      pers_spir: pers_spir,
     pers_emot: pers_emot,
     pers_health: pers_health,
     pers_pr_req: pers_pr_req,
      
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
