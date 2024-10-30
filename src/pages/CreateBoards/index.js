import { IoAdd } from "react-icons/io5";
import { useBoardStore } from "../../store/useBoardStore";
import { useState } from "react";
import { TextArea } from "../Board";
import { FaSave } from "react-icons/fa";

const Header = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl">Boards</h2>
        <button
          disabled={isAdding}
          onClick={() => setIsAdding(true)}
          className="flex justify-center items-center border rounded px-3 py-2 text-xs border-gray-700 text-gray-200 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          <span>Add Board</span>
          <span className="ml-2">
            <IoAdd />
          </span>
        </button>
      </div>
      {isAdding ? (
        <div className="px-4 mb-3">
          <TextArea text={title} setText={setTitle} placeholder="Board title" />
          <TextArea
            text={description}
            setText={setDescription}
            autoFocus={false}
            className="min-h-20"
            placeholder="Description"
          />

          <div className="flex justify-end items-center mt-1">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setIsAdding(false);
              }}
              className="text-orange-600 mr-2"
            >
              discard
            </button>
            <button className="flex justify-center items-center border rounded px-3 py-2 text-xs border-yellow-500 text-yellow-500 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
              <span>Save</span>
              <span className="ml-2">
                <FaSave />
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const BoardCard = ({ board, index }) => {
  return (
    <div className="border border-gray-800 p-3 mb-2 group cursor-pointer">
      <h2 className="font-semibold text-lg mb-2">
        <span className="text-slate-500 group-hover:text-slate-400">
          #{index + 1}{" "}
        </span>
        <span className="text-zinc-400 group-hover:text-zinc-300">
          {board.title}
        </span>
      </h2>
      <p className="text-sm text-gray-500">{board.description}</p>
    </div>
  );
};

const List = () => {
  const boards = useBoardStore((state) => state.boards);

  return (
    <div className="px-4 flex-grow overflow-auto custom-scrollbar">
      {boards.map((board, index) => (
        <BoardCard board={board} index={index} />
      ))}
    </div>
  );
};

const Boards = () => {
  return (
    <div className="h-[80vh] min-w-64 max-w-96 w-full border rounded border-gray-600 flex flex-col">
      <Header />
      <List />
    </div>
  );
};

const CreateBoards = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center px-2">
      <Boards />
    </div>
  );
};

export default CreateBoards;
