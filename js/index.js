function changeEye(e) {
    let state = e.target.getAttribute("data-state");
    if (state == "shown") {
        e.target.src = "../assets/svg/closed-eye.svg"
        e.target.setAttribute("data-state", "hidden")
        document.getElementById("password").type = "string"
    } else {
        e.target.src = "../assets/svg/eye (1).svg"
        e.target.setAttribute("data-state", "shown")
        document.getElementById("password").type = "password"
    }
}



function validateEmail(email) {
    let validatorReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
    return email.length && validatorReg.test(email);
}

function validatePassword(password, verify=false) {
    let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    return password.length && (!verify || validatorReg.test(password));
}