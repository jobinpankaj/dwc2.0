import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const legalAge = localStorage.getItem("above18")
  if (!legalAge) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;