import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTask, updateTask } from "../../Store/actions/taskActions"
import { useFormik } from "formik"
import taskFromSchema, { taskFormInitialValues } from "../../FormSchemas/taskFromSchema"

const Task = ({ data }) => {
    const [editing, setEditing] = useState(false)

    const dispatch = useDispatch()

    const updateTaskFormik = useFormik({
        initialValues: taskFormInitialValues,
        validationSchema: taskFromSchema,
        onSubmit: (values) => {
            dispatch(updateTask(data.id, values.title, values.completed))
            setEditing(false)
        }
    })

    const handleDiscard = () => {
        updateTaskFormik.resetForm()
        setEditing(false)
    }

    if (editing) {
        return (
            <div className="task" key={data.id}>
                <form onSubmit={updateTaskFormik.handleSubmit}>
                    <div className="details">
                        <div>
                            <input name="title" value={updateTaskFormik.values.title} placeholder="Task" onChange={updateTaskFormik.handleChange} />
                            {updateTaskFormik.errors.title ? <div>{updateTaskFormik.errors.title}</div> : null}
                        </div>
                        <div>
                            <input name="completed" checked={updateTaskFormik.values.completed} type="checkbox" onChange={updateTaskFormik.handleChange} />
                        </div>
                    </div>
                    <div className="options">
                        <button type="submit" disabled={!updateTaskFormik.isValid}>Update</button>
                        <button onClick={handleDiscard} type="button">Discard</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="task" key={data.id}>
            <div className="details">
                <div className="title">
                    {updateTaskFormik.values.title}
                </div>
                <div>
                    {updateTaskFormik.values.completed ? "Completed" : "Pending"}
                </div>
            </div>
            <div className="options">
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={() => dispatch(deleteTask(data.id))}>Delete</button>
            </div>
        </div>
    )
}

export default Task