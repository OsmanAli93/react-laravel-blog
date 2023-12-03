import React, { useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, open, close }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full flex bg-gray-900 bg-opacity-50"
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default Modal;
