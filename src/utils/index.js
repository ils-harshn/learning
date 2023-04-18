const validator = {
    "email": (email) => {
        let validatorReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
        return {
            is_valid: (email.length > 0) && validatorReg.test(email),
            msg: "*Please enter valid email address",
        };
    },
    "password": (password, regex = false) => {
        if (regex) {
            let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/g;
            return {
                "is_valid": password.length && (validatorReg.test(password)),
                "msg": "*Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
            }
        } else {
            return {
                "is_valid": password.length && password.length > 0,
                "msg": "*Required"
            }
        }
    },
    "*": (value) => ({
        is_valid: value.length > 0,
        msg: "*Required",
    }),
}

export const check_field = (event, setFunc, setErrorFunc, validator_name) => {
    let value = event.target.value;
    setFunc(value);
    let { is_valid, msg } = validator[validator_name](value);
    is_valid ? setErrorFunc("") : setErrorFunc(msg)
}

export const clearToken = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
}

export const setToken = (token, rememberMe) => {
    if (rememberMe) localStorage.setItem("token", token);
    else sessionStorage.setItem("token", token);
}