function validateLogin(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let email_error_ele = document.getElementById("invalid-email");
    let password_error_ele = document.getElementById("invalid-password");
    // var form = new FormData(document.getElementById("form"));
    let email = form.get("email");
    let password = form.get("password");
    let is_valid_email = validateEmail(email);
    let is_valid_password = validatePassword(password);
    

    if (is_valid_email && is_valid_password) {
        alert("Successfull")
    }

    if (is_valid_email == false) {
        email_error_ele.innerHTML = "*Please enter valid email address";
        document.getElementById("email").style.borderBottom = "2px solid #FF0000"
    } 
    if (is_valid_password == false) {
        password_error_ele.innerHTML = "*Required";
        document.getElementById("password").style.borderBottom = "2px solid #FF0000"
    } 
}