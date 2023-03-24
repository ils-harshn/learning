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

function validatePassword(password, verify = false) {
    let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    return password.length && (!verify || validatorReg.test(password));
}

const check = (value, error_ele, msg, line_ele, style = "2px solid #FF0000") => {
    if (value == false) {
        if (error_ele) document.getElementById(`invalid-${error_ele}`).innerHTML = msg;
        document.getElementById(line_ele).style.borderBottom = style
    } else {
        if (error_ele) document.getElementById(`invalid-${error_ele}`).innerHTML = "";
        document.getElementById(line_ele).style.borderBottom = ""
    }
}

const check_length = (string) => string.length > 0