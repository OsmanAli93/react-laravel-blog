import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RESET_SUCCESS_MESSAGE } from "../constants";

const Toast = ({ success, children, seconds, resetMessage }) => {
  const [show, setShow] = useState(success);

  useEffect(() => {
    let timeout;

    if (show) {
      timeout = setTimeout(() => {
        setShow(false);
        resetMessage();
      }, seconds);
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      id="toast-simple"
      className={`${
        show ? "block" : "hidden"
      } flex items-center w-full fixed bottom-[30px] left-[30px]  max-w-xs p-4 space-x-4 transistion-all text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert`}
    >
      {children}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetMessage: () => dispatch({ type: RESET_SUCCESS_MESSAGE }),
  };
};

export default connect(null, mapDispatchToProps)(Toast);
