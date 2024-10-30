import { create } from "zustand";

export const useBoardStore = create((set) => ({
  boards: [
    {
      id: "1",
      title: "Home Works",
      description: "A board to keep track of home tasks sad A board to keep track of home tasks sad A board to keep track of home tasks sad A board to keep track of home tasks sad A board to keep track of home tasks sad ",
    },
    {
      id: "2",
      title: "Work Projects",
      description: "A board to organize work-related tasks and projects",
    },
    {
      id: "3",
      title: "Personal Goals",
      description: "A board to set and monitor personal goals",
    },
    {
      id: "4",
      title: "Fitness Plan",
      description: "A board to track fitness routines and goals",
    },
    {
      id: "5",
      title: "Reading List",
      description: "A board to keep track of books and articles to read",
    },
    {
      id: "6",
      title: "Travel Planning",
      description: "A board for planning and organizing travel details",
    },
    {
      id: "7",
      title: "Shopping List",
      description: "A board for managing shopping needs and wishlist items",
    },
    {
      id: "8",
      title: "Event Organization",
      description: "A board to plan and manage events and gatherings",
    },
    {
      id: "9",
      title: "Learning Tracker",
      description: "A board to track learning progress and resources",
    },
    {
      id: "10",
      title: "Health & Wellness",
      description: "A board to monitor health and wellness activities",
    },
  ],
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
