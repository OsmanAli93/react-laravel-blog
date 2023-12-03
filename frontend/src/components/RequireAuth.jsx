import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, token }) => {
  if (token) {
    return children;
  }

  return <Navigate to="/" />;
};

export default RequireAuth;
