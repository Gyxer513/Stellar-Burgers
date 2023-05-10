import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { ILocationState } from "../../services/types/types";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute: React.FC<RouteProps & {onlyForAuth: boolean}> = ({
  onlyForAuth,
  children,
  ...rest
}) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation<ILocationState>();

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || {
      from: { pathname: "/" },
    };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect
          to={{ pathname: "/login", state: { from: location } }}
        />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
