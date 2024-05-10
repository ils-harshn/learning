import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_AUDIO_STREAM_SOCKET_URL);

function AudioStream() {
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    initPeerConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initPeerConnection = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setLocalStream(stream);

    const peerConnection = new RTCPeerConnection();
    peerConnection.addStream(stream);

    peerConnection.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("icecandidate", event.candidate, socket.id);
      }
    };

    socket.on("offer", async (offer, senderId) => {
      if (senderId !== socket.id) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer, socket.id);
      }
    });

    socket.on("answer", async (answer, senderId) => {
      if (senderId !== socket.id) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      }
    });

    socket.on("icecandidate", async (candidate, senderId) => {
      if (senderId !== socket.id) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    setPeerConnection(peerConnection);
  };

  const callPeer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", offer, socket.id);
  };

  return (
    <div>
      <h1>Real-time Audio Call</h1>
      <button onClick={callPeer}>Call Peer</button>
      <div>
        <h2>Your Audio</h2>
        {localStream && (
          <audio src={window.URL.createObjectURL(localStream)} autoPlay muted />
        )}
      </div>
      <div>
        <h2>Remote Audio</h2>
        {remoteStream && (
          <audio src={window.URL.createObjectURL(remoteStream)} autoPlay />
        )}
      </div>
    </div>
  );
}

export default AudioStream;
