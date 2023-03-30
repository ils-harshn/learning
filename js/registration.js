function hide(ele) {
    ele.style.display = "none";
}

function show(ele, value = "block") {
    ele.style.display = value;
}


function showStep(index) {
    let elements = document.getElementsByClassName("tab-step");
    for (let i = 0; i < 2; i++) {
        elements[i].classList.remove("active")
    }
    elements[index].classList.add("active");
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
    showStep(1)
    scrollTop()
}

function getToPrevStep() {
    let step_1 = document.getElementById("step-01");
    let step_2 = document.getElementById("step-02");
    hide(step_2)
    show(step_1)
    showStep(0)
    scrollTop()
}

function validateFormStep1(e) {
    e.preventDefault();
    let form = new FormData(e.target)
    let email = form.get("email");
    let password = form.get("password");
    let first_name = form.get("first-name");
    let last_name = form.get("last-name");
    let confirm_password = form.get("confirm-password")

    let is_valid_email = validateEmail(email);
    let is_valid_password = validatePassword(password, true);
    let is_contact_number_valid = validateContactNumber()
    let is_first_name_valid = first_name.length > 0
    let is_last_name_valid = last_name.length > 0
    let is_confirm_password = (password == confirm_password);

    if (is_valid_email && is_valid_password && is_contact_number_valid && is_first_name_valid && is_last_name_valid && is_confirm_password) {
        getToNextStep()
    }

    check(is_valid_email, "email", "*Please enter valid email address", "email")
    check(is_valid_password, "password", "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:", "password")
    check(is_confirm_password, "confirm-password", "*Password Dose not Match", "confirm-password")
    check(is_first_name_valid, undefined, "", "first-name")
    check(is_last_name_valid, undefined, "", "last-name")
    scrollTop()
}

function validateFormStep2(e) {
    e.preventDefault()
    let form = new FormData(e.target)
    let is_success = true;
    let is_terms_and_conditions = false;

    form.forEach((value, key) => {
        is_success &&= check_length(value)
        if (key == "terms-and-conditions") {
            if (value == "on") {
                is_terms_and_conditions = true;
            } else {
                is_terms_and_conditions = true;
            }
        } else {
            check(value, key, "*Required", key)
        }
    })

    if (is_terms_and_conditions == false) {
        document.getElementById(`invalid-terms-and-conditions`).innerHTML = "*Please accept Terms of service and Privacy Policy";
    } else {
        document.getElementById(`invalid-terms-and-conditions`).innerHTML = "";
    }
    if (is_success && is_terms_and_conditions) alert("Done!");
}


showStep(0)