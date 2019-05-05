$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstnameInput = $("input#firstname-input");
  var lastnameInput = $("input#lastname-input");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var positionInput = $("input#position-input");
  var areaInput = $("input#area-input");
  var countryInput = $("input#country-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      first_name: firstnameInput.val().trim(),
      last_name: lastnameInput.val().trim(),
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      position: positionInput.val().trim(),
      area: areaInput.val().trim(),
      country: countryInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.first_name, userData.last_name, userData.username, userData.email, userData.password, userData.position, userData.area, userData.country);
    firstnameInput.val("");
    lastnameInput;
    usernameInput;
    emailInput.val("");
    passwordInput.val("");
    positionInput;
    areaInput;
    countryInput;
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(first_name, last_name, username, email, password, position, area, country) {
    $.post("/api/signup", {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      position: position,
      area: area,
      country: country
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
