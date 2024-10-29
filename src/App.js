import { useEffect, useRef, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const DUMMY_TASKS = [
  { columnId: "backlog", title: "Gather Requirements" },
  { columnId: "backlog", title: "Research Competitors" },
  { columnId: "backlog", title: "Create Project Proposal" },

  { columnId: "todo", title: "Design Homepage" },
  { columnId: "todo", title: "Set Up Database" },
  { columnId: "todo", title: "Write User Stories" },
  { columnId: "todo", title: "Plan Sprint" },

  { columnId: "inprogress", title: "Develop Login Feature" },
  { columnId: "inprogress", title: "Implement User Profiles" },
  { columnId: "inprogress", title: "Build API Endpoints" },

  { columnId: "done", title: "Initial Project Setup" },
  { columnId: "done", title: "Configure Linter and Formatter" },
  { columnId: "done", title: "Set Up Version Control" },
  { columnId: "done", title: "Complete Documentation" },
  { columnId: "done", title: "Deploy to Staging" },
];

export const useBoardStore = create((set) => ({
  tasks: DUMMY_TASKS.map((task) => ({ ...task, id: uuidv4() })),
  addTask: (newTask) =>
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

const Task = ({ task, className }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`mx-4 mb-2 p-3 text-sm active:cursor-grabbing ${className}`}
    >
      {task.title}
    </div>
  );
};

const TextArea = ({ text, setText }) => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <textarea
      autoFocus
      ref={textareaRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onInput={handleInput}
      className="bg-transparent border border-gray-600 w-full rounded p-2 text-sm text-gray-200 placeholder-gray-500 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 overflow-hidden resize-none"
      placeholder="Add Task"
      rows={1}
    ></textarea>
  );
};

const AddTask = ({ id }) => {
  const addTask = useBoardStore((state) => state.addTask);
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      id: uuidv4(),
      columnId: id,
      title: text,
    });
    setText("");
    setIsAdding(false);
  };

  return isAdding ? (
    <form onSubmit={handleSubmit}>
      <div className="px-4">
        <TextArea text={text} setText={setText} />
        <div className="flex justify-end items-center mt-1">
          <button
            type="button"
            onClick={() => {
              setText("");
              setIsAdding(false);
            }}
            className="text-orange-600 mr-2"
          >
            close
          </button>
          <button
            type="submit"
            className="flex justify-center items-center border rounded px-3 py-2 text-xs border-gray-700 text-gray-200 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <span>Add Task</span>
            <span className="ml-2">
              <IoAdd />
            </span>
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div className="px-4">
      <button
        onClick={() => setIsAdding(true)}
        className="flex justify-center items-center border rounded mb-2 p-3 w-full text-sm border-gray-700 text-gray-200 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        <span>Add Task</span>
        <span className="ml-2">
          <IoAdd />
        </span>
      </button>
    </div>
  );
};

const Column = ({ id, title, tasks, headingColor, taskClass }) => {
  return (
    <div className="w-64 shrink-0 h-full rounded">
      <div className={`p-4 flex justify-between items-center ${headingColor}`}>
        <h3 className="font-medium text-lg">{title}</h3>
        <span className="text-sm">{tasks.length}</span>
      </div>

      <div>
        {tasks.length ? (
          tasks.map((task) => (
            <Task key={task.id} task={task} className={taskClass} />
          ))
        ) : (
          <div className="mx-4 border rounded mb-2 p-3 text-sm border-gray-700 text-center">
            No Task Found
          </div>
        )}
        <AddTask id={id} />
      </div>
    </div>
  );
};

const Bin = () => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [isActive, setActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    deleteTask(taskId);
    setActive(false);
  };

  return (
    <div className="w-64 shrink-0">
      <div className="p-4">
        <h3
          className={`font-medium text-lg ${
            isActive ? "text-red-500" : "text-slate-500"
          }`}
        >
          Delete Task
        </h3>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setActive(true);
        }}
        onDragLeave={() => setActive(false)}
        className={`border aspect-square mx-4 rounded flex justify-center items-center ${
          isActive ? "border-red-700" : "border-gray-700"
        }`}
      >
        <MdDelete
          size={30}
          className={`${isActive ? "text-red-600" : "text-gray-600"}`}
        />
      </div>
    </div>
  );
};

const Board = () => {
  const tasks = useBoardStore((state) => state.tasks);

  const COLUMNS = [
    {
      id: "backlog",
      title: "Backlog",
      headingColor: "text-gray-400",
      taskClass:
        "border border-slate-600 text-slate-200 bg-slate-900 rounded shadow-md transition duration-200 ease-in-out hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400",
    },
    {
      id: "todo",
      title: "Todo",
      headingColor: "text-blue-500",
      taskClass:
        "border border-blue-600 text-blue-200 bg-blue-900 rounded shadow-md transition duration-200 ease-in-out hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400",
    },
    {
      id: "inprogress",
      title: "In Progress",
      headingColor: "text-yellow-500",
      taskClass:
        "border border-yellow-600 text-yellow-200 bg-yellow-900 rounded shadow-md transition duration-200 ease-in-out hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400",
    },
    {
      id: "done",
      title: "Done",
      headingColor: "text-green-500",
      taskClass:
        "border border-green-600 text-green-200 bg-green-900 rounded shadow-md transition duration-200 ease-in-out hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400",
    },
  ];

  return (
    <div className="flex gap-3 h-full w-full overflow-scroll p-12 scrollbar-hide">
      {COLUMNS.map((col) => (
        <Column
          key={col.id}
          {...col}
          tasks={tasks.filter((task) => task.columnId === col.id)}
        />
      ))}
      <Bin />
    </div>
  );
};

const App = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

export default App;
