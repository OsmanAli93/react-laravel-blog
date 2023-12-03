import React from "react";

const Button = ({ children, type, disabled }) => {
  return (
    <button
      type={type}
      className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
        disabled && "disabled:opacity-75"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
