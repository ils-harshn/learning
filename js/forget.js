function validate_forget_form(e) {
    e.preventDefault();
    let is_ok = validate_form(e);
    if (is_ok) alert("Successfull");
}