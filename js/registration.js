const password_ele = document.getElementById("password");

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

function check_step01_form(e) {
    e.preventDefault();
    let is_ok = validate_form(e);
    if (is_ok) getToNextStep();
    return is_ok;
}


function check_step02_form(e) {
    e.preventDefault();
    let is_ok = validate_form(e);
    let value = document.getElementById("terms-and-conditions").checked;
    is_ok &&= value;
    if (!value) document.getElementById("invalid-terms-and-conditions").innerHTML = "*Please accept terms and conditions";
    if (is_ok) alert("success");
    return is_ok;
}

showStep(0)