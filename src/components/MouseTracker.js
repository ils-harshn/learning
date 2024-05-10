import React, { useState, useEffect, useRef } from "react";
import { socket } from "../sockets";

const MouseTracker = () => {
  const [userData, setUserData] = useState({});
  const circleRefs = useRef({});

  const handleMouseMove = (event) => {
    if (socket) {
      socket.emit("mousemove", { x: event.clientX, y: event.clientY });
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.emit("i-am-connected");

    socket.on("userData", (data) => {
      setUserData(data);
    });

    socket.on("moving", (data) => {
      if (circleRefs.current[data.userId]) {
        circleRefs.current[data.userId].style.top = `${data.y}px`;
        circleRefs.current[data.userId].style.left = `${data.x}px`;
      }
    });

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      socket.off("userData");
      socket.off("moving");
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, [socket]);

  return Object.keys(userData).map((userId) =>
    userId === socket.id ? null : (
      <div
        key={userId}
        ref={(ref) => (circleRefs.current[userId] = ref)}
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: userData[userId].color,
        }}
      ></div>
    )
  );
};

export default MouseTracker;
