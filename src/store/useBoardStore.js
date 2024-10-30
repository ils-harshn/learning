import { create } from "zustand";

export const useBoardStore = create((set) => ({
  boards: JSON.parse(localStorage.getItem("boards")) || [],

  addBoard: (newBoard) => {
    set((state) => {
      const newBoards = [newBoard, ...state.boards];
      localStorage.setItem("boards", JSON.stringify(newBoards));
      return { boards: newBoards };
    });
  },
  tasks: JSON.parse(localStorage.getItem("data")) || [],
  savedChanges: true,
  toggleSavedChanges: (value) => set({ savedChanges: value }),

  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
      savedChanges: false,
    })),

  editTask: (taskId, updatedTaskData) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData } : task
      ),
      savedChanges: false,
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      savedChanges: false,
    })),

  moveTask: (taskToBeMovedId, beforeWhichTaskId, columnId) =>
    set((state) => {
      const taskToMove = state.tasks.find(
        (task) => task.id === taskToBeMovedId
      );
      if (!taskToMove) return state;

      const updatedTasks = state.tasks.filter(
        (task) => task.id !== taskToBeMovedId
      );

      if (beforeWhichTaskId === "-1") {
        return {
          tasks: [...updatedTasks, { ...taskToMove, columnId: columnId }],
          savedChanges: false,
        };
      }

      const insertIndex = updatedTasks.findIndex(
        (task) => task.id === beforeWhichTaskId
      );

      if (insertIndex === -1) {
        return state;
      }

      return {
        tasks: [
          ...updatedTasks.slice(0, insertIndex),
          { ...taskToMove, columnId: columnId },
          ...updatedTasks.slice(insertIndex),
        ],
        savedChanges: false,
      };
    }),
}));
