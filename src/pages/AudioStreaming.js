import React, { useEffect, useRef, useState } from "react";

const AudioStream = () => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaSource = new MediaSource();
  const [volume, setVolume] = useState(1); // State to control volume
  const [loading, setLoading] = useState(true); // State to control loading

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = URL.createObjectURL(mediaSource);
    audio.volume = volume;

    const sourceOpen = () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      fetchStream(sourceBuffer);
    };

    mediaSource.addEventListener("sourceopen", sourceOpen);

    setupAudioContext();

    return () => {
      mediaSource.removeEventListener("sourceopen", sourceOpen);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const fetchStream = async (sourceBuffer) => {
    const response = await fetch(
      "https://valuable-easy-flame.glitch.me/stream"
    );
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
      if (audioRef.current.currentTime) {
        const currentTime = audioRef.current.currentTime;
        const removeTime = currentTime - 60; // Retain the last 60 seconds of audio

        if (removeTime > 0) {
          sourceBuffer.remove(0, removeTime);
        }
      }
    };

    bufferCleanupTimer = setInterval(cleanupBuffer, 30000); // Cleanup every 30 seconds

    readChunk();
  };

  const setupAudioContext = () => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasCtx = canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`;
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        x += barWidth + 1;
      }
    };

    draw();
  };

  const handleCanPlay = () => {
    setLoading(false);
  };

  const handleWaiting = () => {
    setLoading(true);
  };

  const handlePlaying = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <audio
        id="audioPlayer"
        controls
        autoPlay
        ref={audioRef}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        style={{
          display: "none",
        }}
      ></audio>
      <div>
        <label htmlFor="volume">Volume: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <canvas ref={canvasRef} width="600" height="100"></canvas>
    </div>
  );
};

export default AudioStream;
