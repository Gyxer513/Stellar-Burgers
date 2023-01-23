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
    history.push("/Stellar-Burgers");
  };
  const closeDetailsModal = () => {
    history.push("/Stellar-Burgers");
  };
  const closeOrderModal = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route  exact path="/Stellar-Burgers/">
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </Route>
        <Route exact path="/Stellar-Burgers/login">
          <Login />
        </Route>
        <Route exact path="/Stellar-Burgers/feed">
          <Feed />
        </Route>
        <Route exact path="/Stellar-Burgers/reset-password">
          <ResertPassword />
        </Route>
        <Route exact path="/Stellar-Burgers/register">
          <Register />
        </Route>
        <Route exact path="/Stellar-Burgers/ingredients/:id">
          <IngredientDetails />
        </Route>
        <Route exact path="/Stellar-Burgers/forgot-password">
          <ForgotPassword />
        </Route>
        <ProtectedRoute exact path="/Stellar-Burgers/profile" onlyForAuth>
          {userData && <Profile />}
        </ProtectedRoute>
        <ProtectedRoute exact path="/Stellar-Burgers/profile/orders/" onlyForAuth>
          {userData && <Profile />}
        </ProtectedRoute>
        <Route exact path="/Stellar-Burgers/feed/:orderNumber">
          <FullOrderInfo />
        </Route>
        <ProtectedRoute path="/Stellar-Burgers/profile/orders/:orderNumber" onlyForAuth>
          <FullOrderInfo />
        </ProtectedRoute>
        <Route exact path="*">
          <PageNotFound />
        </Route> 
      </Switch>

      <ProtectedRoute path="/Stellar-Burgers/order" onlyForAuth>
        <Modal onClose={closeDetailsModal}>
          <OrderDetails />
        </Modal>
      </ProtectedRoute>
      {background && (
        <Route path="/Stellar-Burgers/ingredients/:id">
          <Modal onClose={closeIngredientModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/Stellar-Burgers/feed/:orderNumber">
          <Modal onClose={closeOrderModal}>
            <FullOrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/Stellar-Burgers/profile/orders/:orderNumber">
          <Modal onClose={closeOrderModal}>
            <FullOrderInfo />
          </Modal>
        </Route>
      )}
    </>
    
  );
}

export default App;
