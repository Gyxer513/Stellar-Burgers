import { Route, Redirect, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({
  onlyForAuth,
  children,
  ...rest
}: {
  onlyForAuth?: boolean;
  children: JSX.Element | null;
  path: string;
}) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation();

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
