import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate
      to="/"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;
