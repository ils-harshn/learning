import { IoAdd } from "react-icons/io5";
import { useBoardStore } from "../../store/useBoardStore";
import { useEffect, useState } from "react";
import { TextArea } from "../Board";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

const Header = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addBoard = useBoardStore((state) => state.addBoard);
  const removeAppId = useBoardStore((state) => state.removeAppId);

  const handleAddBoard = () => {
    addBoard({
      id: uuidv4(),
      title: title,
      description: description,
    });

    setTitle("");
    setDescription("");
    setIsAdding(false);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl">Boards</h2>
        <div className="flex items-center gap-1">
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
          <button
            onClick={() => removeAppId()}
            className="flex justify-center items-center border rounded px-3 py-2 text-xs border-gray-700 text-gray-200 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <span>Exit</span>
            <span className="ml-2">
              <IoMdExit />
            </span>
          </button>
        </div>
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
            <button
              onClick={handleAddBoard}
              className="flex justify-center items-center border rounded px-3 py-2 text-xs border-yellow-500 text-yellow-500 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
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

const BoardCardEdit = ({ board, setEditing }) => {
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);
  const editBoard = useBoardStore((state) => state.editBoard);

  const handleEditBoard = () => {
    editBoard(board.id, {
      title: title,
      description: description,
    });
    setEditing(false);
  };

  return (
    <div className="px-4 my-3">
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
            setEditing(false);
          }}
          className="text-orange-600 mr-2"
        >
          discard
        </button>
        <button
          onClick={handleEditBoard}
          className="flex justify-center items-center border rounded px-3 py-2 text-xs border-yellow-500 text-yellow-500 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          <span>Save</span>
          <span className="ml-2">
            <FaSave />
          </span>
        </button>
      </div>
    </div>
  );
};

const BoardCard = ({ board, index }) => {
  const navigate = useNavigate();
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const [isEditing, setEditing] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteBoard(board.id);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setEditing(true);
  };

  return isEditing ? (
    <BoardCardEdit board={board} setEditing={setEditing} />
  ) : (
    <div
      className="border border-gray-800 p-3 mb-2 group cursor-pointer relative group"
      onClick={() => navigate(`/board/${board.id}`)}
    >
      <h2 className="font-semibold text-lg mb-2">
        <span className="text-slate-500 group-hover:text-slate-400">
          #{index + 1}{" "}
        </span>
        <span className="text-zinc-400 group-hover:text-zinc-300 break-words whitespace-pre-wrap truncate">
          {board.title}
        </span>
      </h2>
      <p className="text-sm text-gray-500 break-words whitespace-pre-wrap truncate">
        {board.description}
      </p>
      <div className="absolute flex flex-col gap-1 top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="opacity-30 hover:opacity-100" onClick={handleDelete}>
          <MdDelete />
        </div>
        <div className="opacity-30 hover:opacity-100" onClick={handleEdit}>
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

const List = () => {
  const boards = useBoardStore((state) => state.boards);

  return (
    <div className="px-4 flex-grow overflow-auto custom-scrollbar">
      {boards.map((board, index) => (
        <BoardCard key={board.id} board={board} index={index} />
      ))}
    </div>
  );
};

const Boards = () => {
  const app_id = useBoardStore((state) => state.app_id);
  const getBoardsApi = useBoardStore((state) => state.getBoardsApi);

  useEffect(() => {
    getBoardsApi(app_id);
  }, []);

  return (
    <div className="h-[80vh] min-w-64 max-w-96 w-full border rounded border-gray-600 flex flex-col">
      <Header />
      <List />
    </div>
  );
};

const AskAppId = () => {
  const [appid, setAppid] = useState("");
  const enterAppwithId = useBoardStore((state) => state.setAppId);

  const handleSetAppId = (e) => {
    e.preventDefault();
    if (appid.trim()) {
      enterAppwithId(appid.trim());
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSetAppId}>
      <input
        value={appid}
        onChange={(e) => setAppid(e.target.value)}
        placeholder="Enter App Id"
        className="bg-transparent border border-gray-600 rounded p-2 text-sm text-gray-200 placeholder-gray-500 transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      />
      <button
        type="submit"
        className="flex justify-center items-center border rounded px-3 py-2 text-xs border-yellow-500 text-yellow-500 bg-gray-800 transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        <span>Submit</span>
      </button>
    </form>
  );
};

const CreateBoards = () => {
  const app_id = useBoardStore((state) => state.app_id);

  return (
    <div className="h-screen w-full flex justify-center items-center px-2 bg-neutral-900 text-neutral-50">
      {app_id ? <Boards /> : <AskAppId />}
    </div>
  );
};

export default CreateBoards;
