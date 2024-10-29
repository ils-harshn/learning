import { useEffect, useRef, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

export const useBoardStore = create((set) => ({
  tasks: [],
  addTask: (newTask) =>
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
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
      };
    }),
}));

const DropIndicator = ({ before, columnId, className }) => {
  return (
    <div
      data-beforeid={before}
      data-columnid={columnId}
      className={className}
    ></div>
  );
};

const Task = ({ task, className, dropIndicatorClass }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <>
      <DropIndicator
        before={task.id}
        columnId={task.columnId}
        className={dropIndicatorClass}
      />
      <motion.div
        layout
        layoutId={task.id}
        draggable
        onDragStart={handleDragStart}
        className={`mx-4 p-3 text-sm active:cursor-grabbing ${className}`}
      >
        {task.title}
      </motion.div>
    </>
  );
};

const TextArea = ({ text, setText, submitForm }) => {
  const textareaRef = useRef(null);

  const handleInput = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        submitForm();
      }
    }
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
      onKeyDown={handleKeyDown}
      className="bg-transparent border border-gray-600 w-full rounded p-2 text-sm text-gray-200 placeholder-gray-500 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 overflow-hidden resize-none"
      placeholder="Add Task"
      rows={1}
    />
  );
};

const AddTask = ({ id }) => {
  const addTask = useBoardStore((state) => state.addTask);
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  const submitForm = () => {
    if (text.trim()) {
      addTask({
        id: uuidv4(),
        columnId: id,
        title: text,
      });
      setText("");
      setIsAdding(false);
    }
  };

  return isAdding ? (
    <motion.form layout onSubmit={handleSubmit}>
      <div className="px-4">
        <TextArea text={text} setText={setText} submitForm={submitForm} />
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
    </motion.form>
  ) : (
    <motion.div layout className="px-4">
      <button
        onClick={() => setIsAdding(true)}
        className="flex justify-center items-center border rounded mb-2 p-3 w-full text-sm border-gray-700 text-gray-200 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        <span>Add Task</span>
        <span className="ml-2">
          <IoAdd />
        </span>
      </button>
    </motion.div>
  );
};

const Column = ({
  id,
  title,
  tasks,
  headingColor,
  taskClass,
  dropIndicatorClass,
}) => {
  const [isActive, setActive] = useState(false);
  const moveTask = useBoardStore((state) => state.moveTask);

  const getIndicators = () =>
    Array.from(document.querySelectorAll(`[data-columnid="${id}"]`));

  const findNearestIndicator = (e, indicators) => {
    const closestIndicator = [...indicators].reduce(
      (closest, indicator) => {
        const box = indicator.getBoundingClientRect();
        const offset = e.clientY - (box.top + box.height / 2);
        if (
          closest.offset === null ||
          Math.abs(offset) < Math.abs(closest.offset)
        ) {
          return { offset, element: indicator };
        }
        return closest;
      },
      { offset: null, element: null }
    );

    return closestIndicator.element;
  };

  const clearHighlightIndicator = (eles) => {
    const indicators = eles || getIndicators();

    indicators.forEach((ele) => {
      ele.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlightIndicator(indicators);
    const nearestIndicator = findNearestIndicator(e, indicators);
    nearestIndicator.style.opacity = 1;
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    setActive(true);
    highlightIndicator(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    const indicators = getIndicators();
    clearHighlightIndicator(indicators);

    const nearestIndicator = findNearestIndicator(e, indicators);
    const beforeId = nearestIndicator.dataset.beforeid;
    const columnId = nearestIndicator.dataset.columnid;

    if (beforeId !== taskId) {
      moveTask(taskId, beforeId, columnId);
    }

    setActive(false);
  };

  return (
    <div
      className={`w-64 shrink-0 h-full rounded transition-colors duration-300 ${
        isActive ? "bg-slate-900" : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragStart}
      onDragLeave={() => {
        setActive(false);
        clearHighlightIndicator();
      }}
    >
      <div className={`p-4 flex justify-between items-center ${headingColor}`}>
        <h3 className="font-medium text-lg">{title}</h3>
        <span className="text-sm">{tasks.length}</span>
      </div>

      <div className="h-full w-full">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            className={taskClass}
            dropIndicatorClass={dropIndicatorClass}
          />
        ))}
        <DropIndicator
          columnId={id}
          className={dropIndicatorClass}
          before="-1"
        />
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
        "border border-slate-600 text-slate-200 bg-slate-900 rounded hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400",
      dropIndicatorClass: "my-0.5 h-0.5 mx-4 opacity-0 bg-gray-700",
    },
    {
      id: "todo",
      title: "Todo",
      headingColor: "text-blue-500",
      taskClass:
        "border border-blue-600 text-blue-200 bg-blue-900 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400",
      dropIndicatorClass: "my-0.5 h-0.5 mx-4 opacity-0 bg-blue-700",
    },
    {
      id: "inprogress",
      title: "In Progress",
      headingColor: "text-yellow-500",
      taskClass:
        "border border-yellow-600 text-yellow-200 bg-yellow-900 rounded hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400",
      dropIndicatorClass: "my-0.5 h-0.5 mx-4 opacity-0 bg-yellow-700",
    },
    {
      id: "done",
      title: "Done",
      headingColor: "text-green-500",
      taskClass:
        "border border-green-600 text-green-200 bg-green-900 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400",
      dropIndicatorClass: "my-0.5 h-0.5 mx-4 opacity-0 bg-green-700",
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
