function validateForget(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let email_error_ele = document.getElementById("invalid-email");
    let email = form.get("email");
    let is_valid_email = validateEmail(email);

    if (is_valid_email == false) {
        email_error_ele.innerHTML = "*Please enter valid email address";
        document.getElementById("email").style.borderBottom = "2px solid #FF0000"
    } else {
        alert("Successfull")
    }
}