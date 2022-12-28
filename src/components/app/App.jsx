/* cSpell:disable */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { deleteOrderData } from "../../services/reducers/order";
import {
  getData,
  clearSelectedIngregientsStore,
} from "../../services/reducers/ingredients";
import { Login } from "../../pages/login/Login.jsx";
import { Register } from "../../pages/register/Register";
import { ForgotPassword } from "../../pages/fogot-password/ForgotPassword";
import { PageNotFound } from "../../pages/pageNotFound/PageNotFound";
import { ProtectedRoute } from "../Protected-route/ProtectedRoute";
import { Profile } from "../../pages/profile/profile";
import { ResertPassword } from "../../pages/resetPassword/resetPassrod";
import { checkAuth } from "../../services/reducers/authorization";
import { getCookie } from "../../utils/cookie";
import { Feed } from "../../pages/feed/feed";
import { FullOrderInfo } from "../FullOrderInfo/FullOrderInfo";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
  });

 
  const background = location.state?.background;
  useEffect(() => {
    dispatch(getData());
    if (getCookie("accessToken")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };

  const closeIngredientModal = () => {
    history.push("/");
  };
  const closeDetailsModal = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    dispatch(deleteOrderData());
    dispatch(clearSelectedIngregientsStore());
  };
  const closeOrderModal = () => {
    history.goBack();
  };
  const openIngredientModal = () => {
    setIngredientDetails({ ...ingredientDetails, isOpened: true });
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients openModal={openIngredientModal} />
              <BurgerConstructor openOrder={openOrderDetails} />
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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route exact path="*">
          <PageNotFound />
        </Route>
      </Switch>

      {orderDetails.isOpened && (
        <ProtectedRoute>
          <Modal onClose={closeDetailsModal}>
            <OrderDetails />
          </Modal>
        </ProtectedRoute>
      )}
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
