/* cSpell:disable */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
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
import { getData } from "../../services/reducers/ingredients";
import { Login } from "../../pages/login/Login.jsx";
import { Register } from "../../pages/register/Register";
import { ForgotPassword } from "../../pages/fogot-password/ForgotPassword";
import { PageNotFound } from "../../pages/PageNotFound/PageNotFound";

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleOrderClick = () => {
    openOrderDetails();
  };

  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
    dispatch(deleteOrderData());
  };

  const getIngredientsData = (cardData) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Switch path="/">
          <Route exact path="/">
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients getData={getIngredientsData} />
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
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="*">
            <PageNotFound  />
          </Route>
        </Switch>

        {orderDetails.isOpened && (
          <Modal onClose={closeAllModals}>
            <OrderDetails />
          </Modal>
        )}
        {ingredientDetails.isOpened && (
          <Modal onClose={closeAllModals}>
            <IngredientDetails
              title={`Детали ингредиента`}
              ingredientData={ingredientDetails.ingredient}
              closeModal={closeAllModals}
            />
          </Modal>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
