import { useEffect, useRef, useState } from "react";
import { socket } from "../sockets/tic_tac_toe_socket";
import { v4 as uuidv4 } from "uuid";

const Board = ({ game, pinIndex, setCode }) => {
  const [board, setBoard] = useState(game.state);
  const [currentChance, setCurrentChance] = useState(game.current_mover);

  const updateState = (row, col) => {
    if (board[row][col] === 0 && socket.id === currentChance) {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[row] = [...newBoard[row]];
        newBoard[row][col] = pinIndex + 1;
        socket.emit("move", { board: newBoard, game });
        return newBoard;
      });
    }
  };

  useEffect(() => {
    const handleBoardChange = (state) => {
      setBoard(state.board);
      setCurrentChance(state.current_mover);
    };

    const handleUserLeft = (userID) => {
      alert(`User Left:\n${userID}`);
      setCode("");
    };

    const handleGameState = (game_state) => {
      if (game_state === 0) {
        alert("GAME OVER");
        setCode("");
      } else if (game_state === 1 || game_state === 2) {
        alert(`${game_state === (pinIndex + 1) ? "You Won" : "You Lost"}`);
        setCode("");
      }
    };

    socket.on("update-game", handleBoardChange);
    socket.on("user-left", handleUserLeft);
    socket.on("game_state", handleGameState);

    return () => {
      socket.off("update-game", handleBoardChange);
      socket.off("user-left", handleUserLeft);
      socket.off("game_state", handleGameState);
      socket.emit("leave-game", { code: game.id });
    };
  }, []);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((block, blockIndex) => (
            <span
              className="block"
              key={blockIndex + rowIndex}
              onClick={() => updateState(rowIndex, blockIndex)}
              style={{
                padding: "20px",
                border: "1px solid black",
                borderRadius: "10px",
                margin: "10px",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {block ? (block === 1 ? "X" : "O") : "+"}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const Game = ({ code, setCode }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.emit("join-game", { code });

    const handleErrorMessage = (err) => {
      if (err.type === "MEMBERSFULL") {
        setCode("");
      }
    };

    const handleStartGame = (state) => {
      setGame(state);
    };

    socket.on("error", handleErrorMessage);
    socket.on("start-game", handleStartGame);

    return () => {
      socket.off("error", handleErrorMessage);
      socket.off("start-game", handleStartGame);
    };
  }, []);

  if (game) {
    return (
      <>
        <ul>
          {game.members.map((memberId) => (
            <li key={memberId}>
              {memberId === socket.id ? "You" : `Friend (${memberId})`}
            </li>
          ))}
        </ul>
        <Board
          game={game}
          pinIndex={game.members.findIndex((id) => id === socket.id)}
          setCode={setCode}
        />
      </>
    );
  }

  return (
    <div>
      <div className="game-code">{code}</div>
    </div>
  );
};

const AskAboutGame = () => {
  const inputRef = useRef();
  const [code, setCode] = useState("");

  if (code) return <Game code={code} setCode={setCode} />;
  return (
    <div>
      <div>
        <input placeholder="Enter Game ID" ref={inputRef}></input>
        <button onClick={() => setCode(inputRef.current?.value)}>JOIN</button>
      </div>
      <div>OR</div>
      <div>
        <button onClick={() => setCode(uuidv4())}>QUICK CREATE GAME</button>
      </div>
    </div>
  );
};

const TicTacToeOnlinePage = () => {
  const [connecting, setConnecting] = useState(socket.connected ? 1 : 2);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      setConnecting(1);
    }

    function onDisconnect() {
      setConnecting(0);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.close();
    };
  }, []);
  return (
    <>
      <div className="connection-status">
        Connection:{" "}
        {connecting === 2
          ? "Please Wait"
          : connecting === 1
          ? "Connected"
          : "Broken"}
      </div>
      {connecting === 1 ? <AskAboutGame /> : null}
    </>
  );
};

export default TicTacToeOnlinePage;
