import * as Yup from "yup"

const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
});

export const initialValues = {
    title: '',
    description: '',
}

export default validationSchema