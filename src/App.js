import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import _dd_ from "./data";
import { create } from "zustand";
import { useInView } from "react-intersection-observer";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// const complete_data = _dd_;
const complete_data = shuffleArray(_dd_);

const fetchNumbers = (nextBatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // const newNumbers = Array.from({ length: 5 }, (_, i) => nextBatch + i);
      const newNumbers = complete_data.slice(nextBatch, nextBatch + 5);
      resolve(newNumbers);
    }, 1000);
  });
};

const useReelIndex = create((set) => ({
  index: 0,
  setIndex: (index) => set({ index: index }),
}));

const Video = ({ data, index, current_index, setIsBuffering, setIsError }) => {
  const videoRef = useRef(null);

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Replay the video when it ends
    }
  };

  const handleVideoError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (current_index === index) {
        videoRef.current.play();
      } else videoRef.current.pause();
    }
  }, [current_index, videoRef]);

  return (
    <video
      ref={videoRef}
      src={data.videoUrl}
      onWaiting={handleWaiting}
      onPlaying={handlePlaying}
      onEnded={handleVideoEnd}
      onError={handleVideoError}
      // preload="none"
    />
  );
};

const Reel = ({ data, index }) => {
  const current_index = useReelIndex((state) => state.index);
  const setIndex = useReelIndex((state) => state.setIndex);
  const { ref, inView } = useInView({
    threshold: 0.7, // 1.0 means the component is fully in view
  });
  const [isBuffering, setIsBuffering] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (inView) {
      setIndex(index);
    }
  }, [inView]);

  return (
    <div ref={ref} className={`reel${inView ? ` active` : ""}`}>
      {isError && (
        <div className="reel-error">
          <h2>Error Loading Video</h2>
        </div>
      )}
      <div className="reel-title truncate">{data.title}</div>
      {current_index === index - 1 ||
      current_index === index ||
      current_index === index + 1 ? (
        <Video
          index={index}
          current_index={current_index}
          data={data}
          setIsBuffering={setIsBuffering}
          setIsError={setIsError}
        />
      ) : null}
      {isBuffering && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

function Reels() {
  const [numbers, setNumbers] = useState(complete_data.slice(0, 5));
  const [isFetching, setFetching] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const reelsRef = useRef(null);

  const loadMoreReels = async () => {
    if (!isFetching) {
      setFetching(true);
      const newNumbers = await fetchNumbers(numbers.length);
      setHasMoreData(newNumbers.length ? true : false);
      setNumbers((prevNumbers) => [...prevNumbers, ...newNumbers]);
      setFetching(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (reelsRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = reelsRef.current;
        const lastReelPosition = scrollHeight - clientHeight - 1200;
        if (scrollTop >= lastReelPosition && !isFetching && hasMoreData) {
          loadMoreReels();
        }
      }
    };

    const reelsElement = reelsRef.current;
    if (reelsElement) {
      reelsElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (reelsElement) {
        reelsElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isFetching]);

  return (
    <>
      <div className="reels" ref={reelsRef}>
        {numbers.map((item, index) => (
          <Reel key={index} data={item} index={index} />
        ))}
        {isFetching && <div className="loading">#</div>}
      </div>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="container">
      {show ? (
        <Reels />
      ) : (
        <button
          onClick={() => {
            document.documentElement.requestFullscreen();
            setShow(true);
          }}
        >
          Play
        </button>
      )}
    </div>
  );
}
