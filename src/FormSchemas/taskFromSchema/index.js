import * as Yup from "yup"
import initialValues from "./initialValues"

const taskFormSchema = Yup.object({
    title: Yup.string().required("*Required"),
    completed: Yup.boolean().required("*Required"),
})

export { initialValues as taskFormInitialValues }
export default taskFormSchema