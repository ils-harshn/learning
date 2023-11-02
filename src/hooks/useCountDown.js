import { useEffect, useState } from "react";

const useCountDown = (duration = 120) => {
  const [seconds, setSeconds] = useState(duration);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds((prevSeconds) =>
        prevSeconds > 0 ? prevSeconds - 1 : prevSeconds
      );
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [seconds]);
  return { seconds };
};

export default useCountDown;
