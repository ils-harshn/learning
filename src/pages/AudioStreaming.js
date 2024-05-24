import React, { useEffect, useRef } from "react";

const AudioStream = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const mediaSource = new MediaSource();
    audio.src = URL.createObjectURL(mediaSource);

    const sourceOpen = () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      fetchStream(sourceBuffer);
    };

    mediaSource.addEventListener("sourceopen", sourceOpen);

    return () => {
      mediaSource.removeEventListener("sourceopen", sourceOpen);
    };
  }, []);

  const fetchStream = async (sourceBuffer) => {
    const response = await fetch("https://valuable-easy-flame.glitch.me/stream");
    const reader = response.body.getReader();
    let bufferCleanupTimer;

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        mediaSource.endOfStream();
        clearInterval(bufferCleanupTimer);
        return;
      }
      sourceBuffer.appendBuffer(value);
      await updateEnd();
      readChunk();
    };

    const updateEnd = () => {
      return new Promise((resolve) => {
        sourceBuffer.addEventListener("updateend", resolve, { once: true });
      });
    };

    const cleanupBuffer = () => {
      const currentTime = audioRef.current.currentTime;
      const removeTime = currentTime - 60; // Retain the last 60 seconds of audio

      if (removeTime > 0) {
        sourceBuffer.remove(0, removeTime);
      }
    };

    bufferCleanupTimer = setInterval(cleanupBuffer, 30000); // Cleanup every 30 seconds

    readChunk();
  };

  return (
    <div>
      <h1>Audio Stream</h1>
      <audio id="audioPlayer" controls autoPlay ref={audioRef}></audio>
    </div>
  );
};

export default AudioStream;
