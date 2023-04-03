var contact_number_error = document.getElementsByClassName('contact-number-error')[0];


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