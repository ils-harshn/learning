const step_1 = document.getElementById("step-01");
const step_2 = document.getElementById("step-02");


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

function getToNextStep(e) {
    e.preventDefault();
    hide(step_1)
    show(step_2)
    scrollTop()
}

function getToPrevStep() {
    hide(step_2)
    show(step_1)
    scrollTop()
}