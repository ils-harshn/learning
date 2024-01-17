import { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "./Dropdown.css";

const Dropdown = ({ options, onSelect, multiselect }) => {
  const [open, toggleOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [text, setText] = useState("");
  const optionsElement = useRef();
  const parentElement = useRef();

  const filterArrayByText = (searchText) => {
    return options?.filter((item) =>
      item.label?.toLowerCase().includes(searchText?.toLowerCase())
    );
  };

  const handleItemClick = (item) => {
    let newSelection = [];
    if (!selection.some((current) => current.value === item.value)) {
      if (multiselect) {
        newSelection = [...selection, item];
      } else {
        newSelection = [item];
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.value !== item.value
      );
      newSelection = [...selectionAfterRemoval];
    }
    setSelection(newSelection);

    if (onSelect) {
      if (multiselect) onSelect(newSelection);
      else onSelect(newSelection?.[0]);
    }
  };

  const isItemInSelection = (item) => {
    return selection.find((current) => current.value === item.value)
      ? true
      : false;
  };

  useEffect(() => {
    if (open && parentElement.current && optionsElement.current) {
      let pos = parentElement.current.getBoundingClientRect();
      optionsElement.current.style.width = `${parentElement.current.offsetWidth}px`;
      let calculatedTop = pos.top + pos.height;
      if (
        calculatedTop + optionsElement.current.offsetHeight >
        document.body.offsetHeight
      ) {
        console.log("COME");
        calculatedTop = pos.top - optionsElement.current.offsetHeight - 2;
      }
      optionsElement.current.style.top = `${calculatedTop}px`;
    }
  }, [open]);

  return (
    <div className="dropdown-wrapper" ref={parentElement}>
      <OutsideClickHandler onOutsideClick={() => toggleOpen(false)}>
        <input
          className="dropdown-input"
          placeholder={"Select"}
          value={text}
          onFocus={() => toggleOpen(true)}
          onChange={(e) => {
            toggleOpen(true);
            setText(e.target.value);
          }}
        ></input>

        <ul ref={optionsElement} className={`${open ? "open" : "closed"}`}>
          {filterArrayByText(text)?.map((item, index) => (
            <li
              key={index}
              className={`${isItemInSelection(item) ? "selected" : ""}`}
            >
              <button type="button" onClick={() => handleItemClick(item)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </OutsideClickHandler>
    </div>
  );
};

export default Dropdown;
