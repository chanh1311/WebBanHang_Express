var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Password không chính xác");
  } else {
    confirm_password.setCustomValidity('');
  }
}

// error?

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;