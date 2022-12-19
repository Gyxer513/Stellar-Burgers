/* cSpell:disable */
import { useState, useEffect } from "react";
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
import { deleteOrderData } from "../../services/reducers/order";
import {
  getData,
  deleteSelectedIngredientData,
  clearSelectedIngregientsStore,
} from "../../services/reducers/ingredients";
import { Login } from "../../pages/login/Login.jsx";
import { Register } from "../../pages/register/Register";
import { ForgotPassword } from "../../pages/fogot-password/ForgotPassword";
import { PageNotFound } from "../../pages/pageNotFound/PageNotFound";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../Protected-route/ProtectedRoute";
import { Profile } from "../../pages/profile/profile";

function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
  });
  const { isAuthorizationSucsess } = useSelector(
    (state) => state.authorizationReducer
  );
  const { ingredients, selectIngredient } = useSelector(
    (state) => state.ingredientsReducer
  );
  const background = location.state?.background;
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleOrderClick = () => {
    openOrderDetails();
  };
  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };
  const closeIngredientModal = () => {
    history.goBack();
    dispatch(deleteSelectedIngredientData());
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };
  const closeDetailsModal = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    dispatch(deleteOrderData());
    dispatch(clearSelectedIngregientsStore());
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
              <BurgerConstructor openOrder={handleOrderClick} />
            </DndProvider>
          </main>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/ingredients/:id">
          {!selectIngredient && <IngredientDetails />}
        </Route>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route exact path="/forgot-password">
          <ForgotPassword />
        </Route>
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
      {ingredients.length > 0 && (
        <Route path="/ingredients/:id">
          <Modal onClose={closeIngredientModal} title="Детали ингредиента">
            {selectIngredient && <IngredientDetails />}
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
