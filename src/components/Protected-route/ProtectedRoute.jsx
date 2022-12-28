import { Route, Redirect, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const { isAuthorizationSuccess } = useSelector(
    (state) => state.authorizationReducer
  );
  const isAuthorized = getCookie("accessToken");
  const location = useLocation();

  if (!onlyForAuth && isAuthorizationSuccess) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorizationSuccess) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
