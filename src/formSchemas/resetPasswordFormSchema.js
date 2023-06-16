import * as Yup from "yup"
import { EMAIL_REGEX, PASSWORD_REGEX } from "../helpers/regex";

const emailVerifySchema = Yup.object({
    email: Yup.string()
        .matches(EMAIL_REGEX, 'Invalid email address')
        .required('Email is required'),
});

export const initialEmailValue = {
    email: '',
}

export const validationOnPasswordsSchema = Yup.object({
    password: Yup.string()
        .matches(PASSWORD_REGEX, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and atleast one special character from (@$!%*?&#)")
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const initialPasswordsValues = {
    password: '',
    confirmPassword: '',
}


export default emailVerifySchema