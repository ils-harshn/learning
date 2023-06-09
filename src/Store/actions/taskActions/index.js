import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../types"


export const addTask = (title, completed=false) => {
    return {
        type: ADD_TODO,
        payload: {
            title,
            completed,
        }
    }
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TODO,
        payload: {
            id,
        }
    }
}

export const updateTask = (taskId, newTitle, newCompleted) => {
    return {
        type: UPDATE_TODO,
        payload: {
            taskId,
            newTitle,
            newCompleted,
        }
    }
}