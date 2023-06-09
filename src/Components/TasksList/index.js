import { useSelector } from "react-redux"
import Task from "../Task"

const TaskList = () => {
    const data = useSelector(reducers => reducers.todoReducer.tasks)

    return (
        <div className="task-list">
            {
                data.map(item => (
                    <Task key={item.id} data={item} />
                ))
            }
        </div>
    )
}

export default TaskList