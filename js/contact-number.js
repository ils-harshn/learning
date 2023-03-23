var contact_number_error = document.getElementsByClassName('contact-number-error')[0];

function validateContactNumber() {
    var contact_number_value = contact_number.value;
    var regMobile = /^\d{10}$/;
    if (contact_number_value.length == 0) {
        contact_number_error.style.visibility = "visible";
        contact_number_error.innerHTML = "*Required";
        contact_number.style.borderBottom = "2px solid red";
        return false;
    }
    else if (!contact_number_value.match(regMobile)) {
        contact_number_error.style.visibility = "visible";
        contact_number_error.innerHTML = "*Please enter valid contact_number number";
        contact_number.style.borderBottom = "2px solid red";
        return false;
    }
    else {
        contact_number_error.style.visibility = "hidden";
        contact_number.style.borderBottom = "1px solid #ced4da";
    }
    return true;
}


const contact_number = document.getElementById("contact-number");
const phoneInput = window.intlTelInput(contact_number, {
    initialCountry: "auto",
    separateDialCode: true,
    geoIpLookup: callback => {
        fetch('https://ipinfo.io/json?token=d2cbda6c7125f3', { headers: { 'Accept': 'application/json' } })
            .then((resp) => resp.json())
            .catch(() => {
                return {
                    country: 'us',
                };
            })
            .then((resp) => callback(resp.country));
    },
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});