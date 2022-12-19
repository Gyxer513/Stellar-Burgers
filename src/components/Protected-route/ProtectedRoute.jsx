import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, ...props }) => {
  const { isAuthorizationSucsess } = useSelector(
    (state) => state.authorizationReducer
  );
  if (!isAuthorizationSucsess) return <Redirect to="/login" />;

  return <Route {...props}>{children}</Route>
};
