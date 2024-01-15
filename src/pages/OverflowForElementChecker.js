import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";

const OverFlowForElementsChecker = () => {
  const options = [
    { value: 1, label: "Apple" },
    { value: 2, label: "Boy" },
    { value: 3, label: "Cat" },
    { value: 4, label: "Dog" },
    { value: 5, label: "Elephant" },
    { value: 6, label: "Fish" },
    { value: 7, label: "Grapes" },
    { value: 8, label: "Harsh" },
    { value: 9, label: "Ice" },
    { value: 10, label: "Joker" },
  ];
  
  const [selected, setSelected] = useState([]);

  const countRef = useRef();
  const tagContainer = useRef();

  const checkOverflow = () => {
    if (tagContainer.current) {
      let remaining = 0;
      const totalWidth = tagContainer.current.offsetWidth;
      let tags = tagContainer.current.getElementsByTagName("span");
      let gotWidth = 10;
      for (let tag of tags) {
        gotWidth += tag.offsetWidth + 10;
        if (gotWidth > totalWidth) {
          remaining += 1;
          tag.style.visibility = "hidden";
        } else {
          tag.style.visibility = "visible";
        }
      }
      if (countRef.current) {
        countRef.current.innerHTML = remaining ? `+${remaining}` : "";
      }
    }
  };

  useLayoutEffect(() => {
    checkOverflow();
  }, [selected]);

  useEffect(() => {
    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      OverFlow For Elements Checker
      <Dropdown
        options={options}
        onSelect={(selectedOptions) => setSelected(selectedOptions)}
        multiselect
      />
      <hr />
      <div>
        <h3>Selected Options</h3>
        <div
          className="selection-container"
          style={{
            border: "1px solid red",
            padding: "10px",
          }}
          ref={tagContainer}
        >
          {selected?.map((item, index) => (
            <span
              key={item.value}
              style={{
                border: "1px solid green",
                marginRight: index === selected.length - 1 ? "" : "10px",
                borderRadius: "8px",
                padding: "6px",
                fontSize: "12px",
                visibility: "hidden",
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div ref={countRef}></div>
      </div>
    </div>
  );
};

export default OverFlowForElementsChecker;
