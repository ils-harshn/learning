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