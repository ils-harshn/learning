// validator["password"] = (password) => {
//     return {
//         is_valid: password.length > 0,
//         msg: "*Required",
//     };
// }

function validate_login_form(e) {
    e.preventDefault();
    let is_ok = validate_form(e);
    if (is_ok) window.location.href = "dashboard.html";
}