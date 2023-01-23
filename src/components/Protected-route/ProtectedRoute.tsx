import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { ILocationState } from "../../services/types/types";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute: React.FC<RouteProps & {onlyForAuth: boolean}> = ({
  onlyForAuth,
  children,
  ...rest
}) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation<ILocationState & { background: Location }>();

  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || {
      from: { pathname: "/Stellar-Burgers/" },
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
          to={{ pathname: "/Stellar-Burgers/login", state: { from: location } }}
        />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
