/* cSpell:disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { api } from "../../utils/Api";
import { getIngredients } from "../../services/actions/ingedients";

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const [modalData, setModalData] = useState([]);
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const orderList = React.useMemo(
    () => ingredients.map((ingredient) => ingredient._id),
    [ingredients]
  );
  const handleOrderClick = () => {
    api
      .sendData(orderList)
      .then((data) => setModalData(data.order.number))
      .catch((error) => {
        console.log(error);
      });
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
          <OrderDetails orderId={modalData} />
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