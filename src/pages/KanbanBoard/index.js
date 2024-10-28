import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useBoardStore } from "./store";
import { TODO_STATUS } from "./store";
import "./index.css";

const LIST_COLOR_TITLE_MAP = {
  TODO: "bg-yellow-400",
  INPROGRESS: "bg-blue-400",
  DONE: "bg-green-400",
};

const LIST_ITEM_COLOR_TITLE_MAP = {
  TODO: "bg-amber-500 text-amber-900",
  INPROGRESS: "bg-indigo-500 text-indigo-100",
  DONE: "bg-teal-500 text-teal-900",
};

const AddTask = ({ id, onClickClose }) => {
  const addTask = useBoardStore((state) => state.addTask);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title,
      status: id,
    });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow p-2 outline-none border-none bg-slate-300 rounded-md"
          autoFocus
          placeholder="Enter Task"
        />
        <button type="submit">
          <IoIosAddCircle className="ml-2 text-orange-300 text-3xl cursor-pointer" />
        </button>
        <MdCancel
          className="ml-1 text-red-500 text-3xl cursor-pointer"
          onClick={onClickClose}
        />
      </div>
    </form>
  );
};

const Task = ({ task }) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <motion.div
      key={task.id}
      layout
      className={`${
        LIST_ITEM_COLOR_TITLE_MAP[task.status]
      } p-2 border-b flex items-center justify-between cursor-grab`}
      draggable
      onDragStart={handleDragStart}
      initial={{ height: 0 }}
      animate={{ height: "40px" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="truncate">{task.title}</div>
      <MdDelete
        className="text-xl text-red-500 opacity-75 hover:opacity-100 cursor-pointer min-w-[20px]"
        onClick={() => deleteTask(task.id)}
      />
    </motion.div>
  );
};

const Board = ({ id, title }) => {
  const tasks = useBoardStore((state) => state.tasks);
  const updateTaskStatus = useBoardStore((state) => state.updateTaskStatus);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const filteredTasks = tasks.filter((item) => item.status === id);

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-w-[280px] w-[400px] h-[600px] border rounded-md bg-slate-400 flex flex-col"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={`p-4 ${LIST_COLOR_TITLE_MAP[id]}`}>
        <h2 className="text-lg text-white font-semibold">{title}</h2>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-custom-todo">
        <AnimatePresence>
          {filteredTasks.length ? (
            <div>
              {filteredTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-white font-semibold">
              No Task
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        {isAddingTask ? (
          <AddTask id={id} onClickClose={() => setIsAddingTask(false)} />
        ) : (
          <button
            className="flex items-center bg-blue-500 p-2 text-sm rounded text-white font-semibold hover:bg-blue-600 duration-300"
            onClick={() => setIsAddingTask(true)}
          >
            Add Task <IoAdd className="ml-2 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  return (
    <div className="flex p-10 gap-10">
      <Board id={TODO_STATUS.TODO} title={"Todo"} />
      <Board id={TODO_STATUS.INPROGRESS} title={"In Progress"} />
      <Board id={TODO_STATUS.DONE} title={"Completed"} />
    </div>
  );
};

export default KanbanBoard;
