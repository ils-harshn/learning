import axios from "axios";
import { create } from "zustand";

const APIURI = "https://lean-pickled-crustacean.glitch.me";

const API_ENDPOINTS = {
  GET_BOARDS: (app_id) => `${APIURI}/${app_id}/boards`,
  ADD_BOARD: (app_id) => `${APIURI}/${app_id}/board`,
  DELETE_BOARD: (app_id, boardId) => `${APIURI}/${app_id}/board/${boardId}`,
  EDIT_BOARD: (app_id, boardId) => `${APIURI}/${app_id}/board/${boardId}`,
  GET_TASKS: (app_id, board_id) => `${APIURI}/${app_id}/${board_id}/tasks`,
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
      get().addBoardApi(newBoard);
      return { boards: newBoards };
    });
  },

  deleteBoard: (boardId) =>
    set((state) => {
      const updatedBoards = state.boards.filter(
        (board) => board.id !== boardId
      );
      get().deleteBoardApi(boardId);
      return { boards: updatedBoards };
    }),

  editBoard: (boardId, updatedboardData) =>
    set((state) => {
      const updatedBoards = state.boards.map((board) =>
        board.id === boardId ? { ...board, ...updatedboardData } : board
      );
      get().editBoardApi(boardId, updatedboardData);
      return { boards: updatedBoards };
    }),

  tasks: [],
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
  getBoardsApi: () => {
    const app_id = get().app_id;
    axios
      .get(API_ENDPOINTS.GET_BOARDS(app_id))
      .then((response) => {
        set({ boards: response.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  addBoardApi: (newBoard) => {
    const app_id = get().app_id;
    console.log(newBoard);
    axios
      .post(API_ENDPOINTS.ADD_BOARD(app_id), newBoard)
      .then((response) => {
        console.log("Board added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding board:", error);
      });
  },
  deleteBoardApi: (boardId) => {
    const app_id = get().app_id;
    axios
      .delete(API_ENDPOINTS.DELETE_BOARD(app_id, boardId))
      .then((response) => {
        console.log("Board deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  },
  editBoardApi: (boardId, updatedBoardData) => {
    const app_id = get().app_id;
    axios
      .put(API_ENDPOINTS.EDIT_BOARD(app_id, boardId), updatedBoardData)
      .then((response) => {
        console.log("Board updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating board:", error);
      });
  },
  getTasksApi: (boardId) => {
    const app_id = get().app_id;
    axios
      .get(API_ENDPOINTS.GET_TASKS(app_id, boardId))
      .then((response) => {
        set({ tasks: response.data });
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  },
}));
