import { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "./Dropdown.css";

const Dropdown = ({ options, onSelect, multiselect }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [text, setText] = useState("");
  const optionsElement = useRef();
  const parentElement = useRef();

  const toggleOpen = (whatToDo = undefined) => {
    whatToDo = whatToDo === undefined ? !open : whatToDo;
    setOpen(whatToDo);
  };

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
        {open && (
          <ul ref={optionsElement}>
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
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Dropdown;
