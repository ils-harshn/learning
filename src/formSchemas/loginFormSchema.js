import * as Yup from "yup"
import { EMAIL_REGEX, PASSWORD_REGEX } from "../helpers/regex";

const validationSchema = Yup.object({
    email: Yup.string()
        .matches(EMAIL_REGEX, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .matches(PASSWORD_REGEX, "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and atleast one special character from (@$!%*?&#)")
        .required('Password is required'),
    rememberMe: Yup.boolean(),
});

export const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
}

export default validationSchema