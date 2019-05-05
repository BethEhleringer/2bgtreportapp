$(document).ready(function() {
// Get JQuery references for report
  var reportEntryForm = $("form.reportentry");
  var persspirInput = $("input#persspir-input");
  var persemotInput = $("input#persemot-input");
 var pershealthInput = $("input#pershealth-input");
  var persprreqInput = $("input#persprreq-input");
var userSelect = $("#user");


  // When the signup button is clicked, we validate the email and password are not blank

  $(reportEntryForm).on("submit", handleFormSubmit);
  // get pr
  var url = window.location.search;
  var reportId;
  var userId;
  var updating = false;

  if (url.indexOf("?report_id=") !== -1) {
    reportId = url.split("=")[1];
    getReportData(reportId, "report");
  }
  else if (url.indexOf("?member_id=") !== -1) {
    userId = url.split("=")[1];
  }
  getUsers();

  function handleFormSubmit(event) {
    event.preventDefault();

  
    //capture the selected yes or no answers
    /*var pers_spir = $("input[name=pers_spir]:checked").val();
    var pers_emot = $("input[name=pers_emot]:checked").val();
    var pers_phys = $("input[name=pers_phys]:checked").val();
    var pers_pr_req = $("input[name=pers_spir]:checked").val();*/
    var newReport = {
      persspirInput: persspirInput,
      persemotInput: persemotInput,
     pershealthInput: pershealthInput,
     persprreqInput: persprreqInput,
     UserId: userSelect.val()
    };
    
    if (updating) {
      newReport.id = reportId;
      updateReport(newReport);
    } else {
      submitReport(newReport);
    }
  }

  function submitReport(report) {
    $.post("/api/reports", report
    /*, function() {
      window.location.href = "/blog";
    }*/
    );
  }

  function getReportData(id, type) {
    var queryUrl;
    switch (type) {
      case "report":
        queryUrl = "/api/reports/" + id;
        break;
      case "member":
        queryUrl = "/api/members/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.UserId || data.id);
          //
          persspirInput.val(data.pers_spir);
          persemotInput.val(data.pers_emot);
          pershealthInput.val(data.pers_health);
          persprreqInput.val(data.pers_pr_req);
          userId = data.UserId || data.id;
          updating = true;
        }
      });
  }

  function getUsers() {
    $.get("/api/users", renderUserList);
  }

  function renderUserList(data) {
    if (!data.length) {
      console.log("blah");
     // window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(memberSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.name);
    return listOption;
  }

  function updateReport(report) {
    $.ajax({
      method: "PUT",
      url: "/api/reports",
      data: report
    })
    .then(function() {
      console.log("report updated")
      //window.location.href="/blog";
    });
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
