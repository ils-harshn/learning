import { create } from "zustand";

const APIURI = "https://lean-pickled-crustacean.glitch.me";

const API_ENDPOINTS = {
  GET_BOARDS: (app_id) => `${APIURI}/${app_id}/boards`,
};

export const useBoardStore = create((set, get) => ({
  app_id: localStorage.getItem("app_id") || "",
  setAppId: (id) => {
    localStorage.setItem("app_id", id);
    set({ app_id: id });
  },
  removeAppId: () => {
    localStorage.removeItem("app_id");
    set({ app_id: "" });
  },

  boards: [],

  addBoard: (newBoard) => {
    set((state) => {
      const newBoards = [newBoard, ...state.boards];
      localStorage.setItem("boards", JSON.stringify(newBoards));
      return { boards: newBoards };
    });
  },

  deleteBoard: (boardId) =>
    set((state) => {
      const updatedBoards = state.boards.filter(
        (board) => board.id !== boardId
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      localStorage.removeItem(boardId);
      return { boards: updatedBoards };
    }),

  editBoard: (boardId, updatedboardData) =>
    set((state) => {
      const updatedBoards = state.boards.map((board) =>
        board.id === boardId ? { ...board, ...updatedboardData } : board
      );
      localStorage.setItem("boards", JSON.stringify(updatedBoards));
      return { boards: updatedBoards };
    }),

  tasks: [],
  setTasks: (boardId) =>
    set({ tasks: JSON.parse(localStorage.getItem(boardId)) || [] }),
  clearTasksFromStore: () => set({ tasks: [], savedChanges: true }),

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

  // apis
  getBoards: () => {
    const app_id = get().app_id;
    fetch(API_ENDPOINTS.GET_BOARDS(app_id))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        set({ boards: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
}));
