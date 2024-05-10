import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_AUDIO_STREAM_SOCKET_URL);

const App = () => {
  const peerRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    socket.on("offer", (offer) => {
      const peer = new RTCPeerConnection();
      peerRef.current = peer;

      peer.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          audioRef.current.srcObject = event.streams[0];
        }
      };

      const desc = new RTCSessionDescription(offer);
      peer.setRemoteDescription(desc);

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => peer.addTrack(track, stream));
          return peer.createAnswer();
        })
        .then((answer) => {
          peer.setLocalDescription(answer);
          socket.emit("answer", answer);
        })
        .catch((error) => {
          console.error("Error adding stream:", error);
        });
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.close();
      }
    };
  }, []);

  const handleOffer = () => {
    const peer = new RTCPeerConnection();
    peerRef.current = peer;

    peer.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        audioRef.current.srcObject = event.streams[0];
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));
        return peer.createOffer();
      })
      .then((offer) => {
        peer.setLocalDescription(offer);
        socket.emit("offer", offer, (answer) => {
          const desc = new RTCSessionDescription(answer);
          peer.setRemoteDescription(desc);
        });
      })
      .catch((error) => {
        console.error("Error adding stream:", error);
      });
  };

  return (
    <div>
      <button onClick={handleOffer}>Offer</button>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default App;
