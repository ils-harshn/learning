import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import "../css/OverflowForElementChecker.css";

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
    { value: 11, label: "Kite" },
    { value: 12, label: "Lion" },
    { value: 13, label: "Moon" },
    { value: 14, label: "Nest" },
    { value: 15, label: "Orange" },
    { value: 16, label: "Penguin" },
    { value: 17, label: "Quilt" },
    { value: 18, label: "Rainbow" },
    { value: 19, label: "Sun" },
    { value: 20, label: "Tree" },
    { value: 21, label: "Umbrella" },
    { value: 22, label: "Violin" },
    { value: 23, label: "Waterfall" },
    { value: 24, label: "Xylophone" },
    { value: 25, label: "Yak" },
    { value: 26, label: "Zebra" },
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
          className="OverflowForElementChecker-selection-container"
          ref={tagContainer}
        >
          {selected?.map((item, index) => (
            <span
              key={item.value}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div ref={countRef} className="OverflowForElementChecker-remaining-counter"></div>
      </div>
    </div>
  );
};

export default OverFlowForElementsChecker;
