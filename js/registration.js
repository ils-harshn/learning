function hide(ele) {
    ele.style.display = "none";
}

function show(ele, value = "block") {
    ele.style.display = value;
}

function scrollTop() {
    let controllOverFlow = document.getElementsByClassName("control-overflow")[0]
    controllOverFlow.scrollTo(0, 0);
}

function getToNextStep() {
    let step_1 = document.getElementById("step-01");
    let step_2 = document.getElementById("step-02");
    hide(step_1)
    show(step_2)
    scrollTop()
}

function getToPrevStep() {
    let step_1 = document.getElementById("step-01");
    let step_2 = document.getElementById("step-02");
    hide(step_2)
    show(step_1)
    scrollTop()
}


function validateFormStep1(e) {
    e.preventDefault();
    let form = new FormData(e.target)
    let email_error_ele = document.getElementById("invalid-email");
    let password_error_ele = document.getElementById("invalid-password");
    let first_name_ele = document.getElementById("first-name");
    let last_name_ele = document.getElementById("last-name");
    let confirm_password_error_ele = document.getElementById("invalid-confirm-password");
    // var form = new FormData(document.getElementById("form"));
    let email = form.get("email");
    let password = form.get("password");
    let first_name = form.get("first-name");
    let last_name = form.get("last-name");
    let confirm_password = form.get("confirm-password")


    let is_valid_email = validateEmail(email);
    let is_valid_password = validatePassword(password);
    let is_contact_number_valid = validateContactNumber()
    let is_first_name_valid = first_name.length > 0
    let is_last_name_valid = last_name.length > 0
    let is_confirm_password = (password == confirm_password);

    if (is_valid_email && is_valid_password && is_contact_number_valid && is_first_name_valid && is_last_name_valid && is_confirm_password) {
        alert("Successfull")
        getToNextStep()
    }

    if (is_valid_email == false) {
        email_error_ele.innerHTML = "*Please enter valid email address";
        document.getElementById("email").style.borderBottom = "2px solid #FF0000"
    } else {
        email_error_ele.innerHTML = "";
        document.getElementById("email").style.borderBottom = ""
    }
    if (is_valid_password == false) {
        password_error_ele.innerHTML = "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:";
        document.getElementById("password").style.borderBottom = "2px solid #FF0000"
    } else {
        password_error_ele.innerHTML = "";
        document.getElementById("password").style.borderBottom = ""
    }
    if (is_first_name_valid == false) {
        first_name_ele.style.borderBottom = "2px solid #FF0000";
    } else {
        first_name_ele.style.borderBottom = "";
    }
    if (is_last_name_valid == false) {
        last_name_ele.style.borderBottom = "2px solid #FF0000";
    } else {
        last_name_ele.style.borderBottom = "";
    }
    if (is_confirm_password == false) {
        confirm_password_error_ele.innerHTML = "*Password Dose not Match";
    }else {
        confirm_password_error_ele.innerHTML = "";
        document.getElementById("confirm-password").style.borderBottom = ""
    }
    scrollTop()
}