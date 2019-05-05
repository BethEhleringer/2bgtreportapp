$(document).ready(function() {
  // Getting references to our form and input
  var reportEntryForm = $("form.reportentry");
  var persspirInput = $("input#persspir-input");
  //var persemotInput = $("input#persemot-input");
 // var pershealthInput = $("input#pershealth-input");
  //var persprreqInput = $("input#persprreq-input");
  

  // When the signup button is clicked, we validate the email and password are not blank
  
  reportEntryForm.on("submit", function(event) {
    event.preventDefault();
    //capture the selected yes or no answers
    var pers_spir = $("input[name=pers_spir]:checked").val();
    var reportData = {
      pers_spir: pers_spir
      //pers_emot: persemotInput.val().trim(),
     // pers_health: pershealthInput.val().trim(),
     // pers_pr_req: persprreqInput.val(),
      
    };
    console.log("yrdyasdfasfsaf");
    console.log(pers_spir)

    if (!reportData.pers_spir) {
      return;
    }
    // If we have an entry for pers_spir, run the signUpUser function
    //enterReport(reportData.pers_spir, reportData.pers_emot, reportData.pers_health, reportData.pers_pr_req);
    enterReport(reportData.pers_spir);
    persspirInput.val("");
    //persemotInput;
    //pershealthInput;
   // persprreqInput;
    console.log("xyzabcde", persspirInput)
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function enterReport(pers_spir) {
   // function enterReport(pers_spir, pers_emot, pers_health, pers_pr_req) {
    $.post("/api/reportEntry", {
      pers_spir: pers_spir
     // pers_emot: pers_emot,
     // pers_health: pers_health,
     // pers_pr_req: pers_pr_req,
      
    }).then(function(data) {
      console.log("testing")
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
