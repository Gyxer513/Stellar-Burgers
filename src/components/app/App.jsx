/* cSpell:disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getIngredients } from "../../services/actions/ingredients";
import { deleteOrder } from "../../services/actions/order";
import Login from "../Login/Login"

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
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
    dispatch(deleteOrder());
  };

  const getIngredientsData = (cardData) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <>
      <Router>
          <AppHeader />
          <Switch>
          <Route exact path="/">
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients getData={getIngredientsData} />
              <BurgerConstructor openOrder={handleOrderClick} />
            </DndProvider>
          </main>
          </Route>
          <Route exact path="/login">
            <Login/>
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
        
      </Router>
    </>
  );
}

export default App;
