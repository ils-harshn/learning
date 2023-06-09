import * as actionsType from "../../actions/types"

const initialState = {
    tasks: []
}

const todoReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionsType.ADD_TODO:
            const { title, completed } = action.payload;
            return {
                tasks: [
                    {
                        id: Date.now(),
                        title,
                        completed,
                    },
                    ...state.tasks,
                ]
            }
        case actionsType.UPDATE_TODO:
            const { taskId, newTitle, newCompleted } = action.payload;
            
            const newTasks = state.tasks.map((item) => {
                if (item.id === taskId) return {
                        id: taskId,
                        title: newTitle,
                        completed: newCompleted
                    }
                return item
            })

            return {
                tasks: newTasks,
            }

        case actionsType.DELETE_TODO:
            const newTasksAfterDeletion = state.tasks.filter((task) => task.id !== action.payload.id)
            return {
                tasks: newTasksAfterDeletion,
            }
        default:
            return state
    }
}

export default todoReducer