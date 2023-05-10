/* cSpell:disable */
import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getData } from "../../services/reducers/ingredients";
import { Login } from "../../pages/login/Login";
import { Register } from "../../pages/register/Register";
import { ForgotPassword } from "../../pages/fogot-password/ForgotPassword";
import { PageNotFound } from "../../pages/pageNotFound/PageNotFound";
import { ProtectedRoute } from "../Protected-route/ProtectedRoute";
import { Profile } from "../../pages/profile/profile";
import { ResertPassword } from "../../pages/resetPassword/resetPassrod";
import { checkAuth, refreshToken } from "../../services/reducers/authorization";
import { Feed } from "../../pages/feed/feed";
import { FullOrderInfo } from "../FullOrderInfo/FullOrderInfo";
import { getCookie } from "../../utils/cookie";
import { useAppSelector, AppDispatch } from "../../services/store";
import { ILocationState } from "../../services/types/types";


function App() {
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { userData, tokenError } = useAppSelector(
    (state) => state.authorizationReducer
  );

  const background = location.state && location.state.background;
  useEffect(() => {
    dispatch(getData());
    if (getCookie("accessToken")) {
      dispatch(checkAuth());
    }
    if (tokenError) {
      dispatch(refreshToken());
    }
  }, [dispatch, tokenError]);

  const closeIngredientModal = () => {
    history.push("/");
  };
  const closeDetailsModal = () => {
    history.push("/");
  };
  const closeOrderModal = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route  exact path="/">
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/reset-password">
          <ResertPassword />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/ingredients/:id">
          <IngredientDetails />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
        <ProtectedRoute exact path="/profile" onlyForAuth>
          {userData && <Profile />}
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/" onlyForAuth>
          {userData && <Profile />}
        </ProtectedRoute>
        <Route exact path="/feed/:orderNumber">
          <FullOrderInfo />
        </Route>
        <ProtectedRoute path="/profile/orders/:orderNumber" onlyForAuth>
          <FullOrderInfo />
        </ProtectedRoute>
        <Route exact path="*">
          <PageNotFound />
        </Route> 
      </Switch>

      <ProtectedRoute path="/order" onlyForAuth>
        <Modal onClose={closeDetailsModal}>
          <OrderDetails />
        </Modal>
      </ProtectedRoute>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={closeIngredientModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:orderNumber">
          <Modal onClose={closeOrderModal}>
            <FullOrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:orderNumber">
          <Modal onClose={closeOrderModal}>
            <FullOrderInfo />
          </Modal>
        </Route>
      )}
    </>
    
  );
}

export default App;
