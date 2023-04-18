import { useNavigate } from "react-router-dom";
import { is_token_available } from "../api";
import { useEffect, useState } from "react";

const validator = {
    "email": (email) => {
        let validatorReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  //Javascript reGex for Email Validation.
        return {
            is_valid: (email.length > 0) && validatorReg.test(email),
            msg: "*Please enter valid email address",
        };
    },
    "password": (password) => {
        let validatorReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/g;
        return {
            "is_valid": password.length && (validatorReg.test(password)),
            "msg": "*Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
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

// Loader
const Loader = () => {
    return (
        <div className="row">
            <div
                className="spinner-grow mx-auto col-10 col-md-8 col-lg-6 mt-5"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
            </div>
        </div>
    )
}


// Protected Component
export const Protected = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const redirect_if_token_not_available = async () => {
        let token = await is_token_available();
        if (token == false) {
            navigate("/auth/login")
            return;
        }
        else setIsLoggedIn(true);
    }

    useEffect(() => {
        redirect_if_token_not_available();
    })

    return (isLoggedIn) ? children : <Loader />
}