import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import Loader from "../../components/Loader/Loader";

export const ProtectedRoute = ({ children, ...props }) => {
  const { isAuthorizationSucsess, userData } = useSelector(
    (state) => state.authorizationReducer
  );

  /* if (!userData && !isAuthorizationSucsess) return <Loader />; */

  if (!isAuthorizationSucsess && !userData) return <Redirect to="/login" />;

  return <Route {...props}>{children}</Route>;
};
