import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import OutsideClickHandler from "react-outside-click-handler";

const ModalWrapper = ({ isOpen, className = "", children, onClose }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${className}`}>
      <OutsideClickHandler onOutsideClick={onClose}>
        <div className="modal">{children}</div>
      </OutsideClickHandler>
    </div>,
    document.body
  );
};

export const GreetUserModal = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [isExited, setExited] = useState(false);

  const closeModal = () => {
    setExited(true);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const openModal = () => {
    setExited(false);
    setOpen(true);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <ModalWrapper
        isOpen={open}
        className={`greet-user-modal-overlay ${isExited ? "close" : ""}`}
        onClose={closeModal}
      >
        <button onClick={closeModal}>Close {name}</button>
      </ModalWrapper>
    </>
  );
};

export default ModalWrapper;
