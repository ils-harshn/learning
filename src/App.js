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

function get_video_url(id) {
  const url = `https://raw.githubusercontent.com/harshcore/shorts/refs/heads/main/videos/${id}.mp4`;
  // const url = `https://raw.githubusercontent.com/harshcore/shorts/refs/heads/main/videos/compressed_${id}.mp4`;
  // const url = `https://45edac4e-022e-4d0d-9e0e-ea8c7606af64-00-2l2eobbktulnc.pike.replit.dev/stream?id=${id}`;
  return url;
}

function get_thumbnail_url(id) {
  const url = `https://raw.githubusercontent.com/harshcore/shorts/refs/heads/main/thumbnails/${id}.png`;
  return url;
}

// const complete_data = _dd_;
const complete_data = shuffleArray(_dd_);

const fetchNumbers = (nextBatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // const newNumbers = Array.from({ length: 5 }, (_, i) => nextBatch + i);
      const newNumbers = complete_data.slice(nextBatch, nextBatch + 5);
      resolve(newNumbers);
    }, 10);
  });
};

const useReelIndex = create((set) => ({
  index: 0,
  setIndex: (index) => set({ index: index }),
}));

const Video = ({
  data,
  index,
  current_index,
  setIsBuffering,
  setIsError,
  setFirstTimeLoaded,
}) => {
  const videoRef = useRef(null);

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    setFirstTimeLoaded(true);
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
    const video = videoRef.current;
    if (video) {
      if (current_index === index) {
        video.src = get_video_url(data.id);
        video.load();
        video.play();
      } else {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    }

    return () => {
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [current_index, videoRef]);

  return (
    <video
      ref={videoRef}
      onWaiting={handleWaiting}
      onPlaying={handlePlaying}
      onEnded={handleVideoEnd}
      onError={handleVideoError}
    />
  );
};

const Thumbnail = ({ data }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    img.src = get_thumbnail_url(data.id);

    return () => {
      if (img) {
        img.removeAttribute("src"); // Clear the src on unmount
      }
    };
  }, [imgRef]);

  return <img ref={imgRef} />;
};

const Reel = ({ data, index }) => {
  const current_index = useReelIndex((state) => state.index);
  const setIndex = useReelIndex((state) => state.setIndex);
  const { ref, inView } = useInView({
    threshold: 0.7, // 1.0 means the component is fully in view
  });
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFirstTimeLoaded, setFirstTimeLoaded] = useState(false);
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
      {(!inView || !isFirstTimeLoaded) &&
        (current_index === index ||
          current_index === index - 1 ||
          current_index === index + 1) && <Thumbnail data={data} />}
      <div className="reel-title truncate">
        {data.title} | {data.id}
      </div>
      {current_index === index ? (
        <Video
          index={index}
          current_index={current_index}
          data={data}
          setIsBuffering={setIsBuffering}
          setFirstTimeLoaded={setFirstTimeLoaded}
          setIsError={setIsError}
        />
      ) : null}
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
