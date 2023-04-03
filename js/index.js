function changeEye(e) {
    let state = e.target.getAttribute("data-state");
    if (state == "shown") {
        e.target.src = "../assets/img/closed-eye.png"
        e.target.setAttribute("data-state", "hidden")
        document.getElementById("password").type = "string"
    } else {
        e.target.src = "../assets/svg/eye (1).svg"
        e.target.setAttribute("data-state", "shown")
        document.getElementById("password").type = "password"
    }
}

const validator = {
    "email": (email) => {
        let validatorReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
        return {
            is_valid: (email.length > 0) && validatorReg.test(email),
            msg: "*Please enter valid email address",
        };
    },
    "password": (password) => {
        let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
        return {
            "is_valid": password.length && (validatorReg.test(password)),
            "msg": "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
        }
    },
    "number": (value) => {
        var contact_number_value = value;
        var regMobile = /^\d{10}$/;
        let is_valid = true;
        if (contact_number_value.length == 0) {
            contact_number_error.style.visibility = "visible";
            is_valid = false;
        }
        else if (!contact_number_value.match(regMobile)) {
            contact_number_error.style.visibility = "visible";
            is_valid = false;
        }
        else {
            contact_number_error.style.visibility = "hidden";
        }
        return {
            is_valid: is_valid,
            msg: "*Please Enter Valid Phone Number"
        };
    },
    "confirm-password": (confirm_password) => {
        return {
            is_valid: (confirm_password == password_ele.value),
            msg: "*Password Dose not Match",
        }
    },
    "*": (value) => ({
        is_valid: value.length > 0,
        msg: "*Required",
    }),
}


const check = (key, value) => {
    let is_valid;
    if (validator[key]) {
        is_valid = validator[key](value)
    } else {
        is_valid = validator["*"](value)
    }
    return is_valid;
}

const showError = (form, key, is_valid, msg) => {
    let error_ele = document.getElementById(`invalid-${key}`);
    let ele = form.querySelector(`input[name=${key}]`);
    if (is_valid) {
        ele.style.borderBottom = "";
        error_ele.innerHTML = ""
    } else {
        ele.style.borderBottom = "2px solid #FF0000";
        error_ele.innerHTML = msg;
    }
}


const showErrorInField = (ele, is_valid, msg, key) => {
    let error_ele = document.getElementById(`invalid-${key}`);
    if (is_valid) {
        ele.style.borderBottom = "";
        error_ele.innerHTML = "";
    } else {
        ele.style.borderBottom = "2px solid #FF0000";
        error_ele.innerHTML = msg;
    }
}

function validate_form(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    let is_ok = true;
    data.forEach((value, key) => {
        let { is_valid, msg } = check(key, value);
        is_ok &&= is_valid;
        showError(e.target, key, is_valid, msg);
    })
    // console.log(is_ok)
    return is_ok;
}

function validate_form_by_itself(form) {
    let data = new FormData(form);
    let is_ok = true;
    data.forEach((value, key) => {
        let { is_valid, msg } = check(key, value);
        is_ok &&= is_valid;
    })
    return is_ok;
}

function toggleButton(form) {
    let ele = form.querySelector("button[type='submit']");
    let is_ok = validate_form_by_itself(form);
    ele.disabled = !is_ok;
}

function validate_field(e, form) {
    if (e.key === "Tab") return;
    let ele = e.target;
    let key = ele.name;
    let value = ele.value;
    let { is_valid, msg } = check(key, value);
    showErrorInField(ele, is_valid, msg, key);
    toggleButton(form);
    console.log()
}