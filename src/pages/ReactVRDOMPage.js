import { useEffect } from "react";
import { useState } from "react";

const ReactVRDOM = () => {
  const [number, setNumber] = useState(0);
  const [changesCount, setChangesCount] = useState(-1);
  const [status, setStatus] = useState("");
  const [searchingDelay, setSearchingDelay] = useState(0);

  const checkNumber = () => {
    setStatus("CHKIN");
    setNumber(number);
    setTimeout(() => {
      setSearchingDelay(0);
      setStatus("SHWNUM");
      setTimeout(() => {
        setStatus("");
      }, 1000);
    }, searchingDelay);
  };

  const setRandomNumber = () => {
    setNumber(Math.floor(Math.random() * 100));
    setSearchingDelay(Math.floor(Math.random() * 5000));
  };

  useEffect(() => {
    setChangesCount(changesCount + 1);
  }, [number]);

  return (
    <div className="App">
      <button onClick={setRandomNumber}>Generate Random Number</button>
      <button onClick={checkNumber} disabled={status}>
        Check
      </button>
      <div>
        <h2>{number}</h2>
        <p>Total Changes: {changesCount}</p>
      </div>
      {status === "CHKIN" && <p>Checking...</p>}
      {status === "SHWNUM" && <p>Number is {number}</p>}
    </div>
  );
};

export default ReactVRDOM;
