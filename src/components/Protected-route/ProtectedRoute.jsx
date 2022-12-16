import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, ...props }) => {
  const { isAuthorizationSucsess } = useSelector(
    (state) => state.authorizationReducer
  );

  return (
    <Route
      {...props}
      render={() =>
        isAuthorizationSucsess ? children : <Redirect to="/login" />
      }
    />
  );
};
