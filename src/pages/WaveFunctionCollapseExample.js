// WaveFunctionCollapseExample

import React, { useRef, useEffect, useState } from "react";
import { socket } from "../sockets/wfc_example_socket";

// const socket = io(process.env.REACT_APP_WFC_EXAMPLE_SOCKET_URL);

const WaveFunctionCollapseExample = () => {
  const canvasRef = useRef(null);
  const countRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const gridSize = 20; // Define gridSize here

  useEffect(() => {
    socket.connect();
    socket.on("gridUpdate", (data) => {
      setGrid(data.grid);
      if (countRef.current) {
        countRef.current.innerText = data.count;
      }
    });

    return () => {
      socket.off("gridUpdate");
      socket.close();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid.forEach((row, y) => {
        row.forEach((cell, x) => {
          ctx.fillStyle = cell === 1 ? "black" : "white";
          ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
        });
      });
    };

    if (grid.length) {
      drawGrid();
    }
  }, [grid, gridSize]);

  return (
    <>
      <div>
        Loop: <span ref={countRef}></span>
      </div>
      <canvas ref={canvasRef} width={gridSize * 50} height={gridSize * 30} />
    </>
  );
};

export default WaveFunctionCollapseExample;
