import { useEffect, useState } from "react";
import { socket } from "../sockets";
import MouseTracker from "../components/MouseTracker";

function SocketMouseMover() {
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
      {connecting === 1 ? <MouseTracker /> : null}
    </>
  );
}

export default SocketMouseMover;
