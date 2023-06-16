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

export default emailVerifySchema