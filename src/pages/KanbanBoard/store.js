import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const TODO_STATUS = {
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  DONE: "DONE",
};

export const useBoardStore = create((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [{ ...task, id: uuidv4() }, ...state.tasks],
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));
