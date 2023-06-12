import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";

const PrivateRoute = ({ element, ...rest }: { element: JSX.Element }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return authenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;