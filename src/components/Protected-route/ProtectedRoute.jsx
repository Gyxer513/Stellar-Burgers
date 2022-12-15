import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({children, ...props}) => {
  const location = useLocation();

  return (
    <Route {...props}>{children}</Route>
)
};
