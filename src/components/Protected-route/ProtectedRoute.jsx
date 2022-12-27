import { Route, Redirect } from "react-router-dom";
import { useLocation} from 'react-router-dom';
import { getCookie } from "../../utils/cookie"



export const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const isAuthorized = getCookie("accessToken");
  const location = useLocation();


  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
