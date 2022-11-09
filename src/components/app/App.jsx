/* cSpell:disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { sendData } from "../../services/actions/order";

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const dispatch = useDispatch();
  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );
  const chosenBun = useSelector((state) => state.ingredients.chosenBun);
  useEffect(() => {
    dispatch(getIngredients());
    console.log(chosenIngredients);
  }, [dispatch]);

  const orderList = React.useMemo(
    () => {
      const ingredientsList = chosenIngredients?.map((ingredient) => ingredient._id)
      ingredientsList.splice(0, 0, chosenBun?._id)
      ingredientsList.splice(ingredientsList.length, 0, chosenBun?._id)
      return ingredientsList
    },
    [chosenIngredients, chosenBun]
  );
  
  const handleOrderClick = () => {
    dispatch(sendData(orderList));
    openOrderDetails();
  };

  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };

  const getIngredientsData = (cardData) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients getData={getIngredientsData} />
          <BurgerConstructor openOrder={handleOrderClick} />
        </DndProvider>
      </main>
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
    </>
  );
}

export default App;
