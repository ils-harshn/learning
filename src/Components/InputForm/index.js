import { useDispatch } from "react-redux"
import { addTask } from "../../Store/actions/taskActions"
import { useFormik } from "formik"
import taskFromSchema, { taskFormInitialValues } from "../../FormSchemas/taskFromSchema"

const InputForm = () => {
    const dispatch = useDispatch()

    const addTaskFormik = useFormik({
        initialValues: taskFormInitialValues,
        validationSchema: taskFromSchema,
        onSubmit: (values) => {
            dispatch(addTask(values.title, values.completed))
            addTaskFormik.resetForm()
        }
    })

    return (
        <form onSubmit={addTaskFormik.handleSubmit}>
            <input name="title" placeholder="Enter Task" value={addTaskFormik.values.title} onChange={addTaskFormik.handleChange} />
            {addTaskFormik.errors.title ? <div>{addTaskFormik.errors.title}</div> : null}
            <input name="completed" type="checkbox" checked={addTaskFormik.values.completed} onChange={addTaskFormik.handleChange} />
            <button type="submit" disabled={!addTaskFormik.isValid}>Add</button>
        </form>
    )
}

export default InputForm