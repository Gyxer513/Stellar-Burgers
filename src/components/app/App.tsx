import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IngredientContext } from "../../services/appContext";
import { api } from "../../utils/Api";

function App() {
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const [ingredients, setIngredients] = useState([]);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const orderList = React.useMemo(
    () => ingredients.map((ingredient: any) => ingredient._id),
    [ingredients]
  );
  const handleOrderClick = () => {
    api.sendData(orderList).then((data) => setModalData(data.order.number)).catch((error) => {
      console.log(error);
    })
    openOrderDetails();
  };


  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };
  const getData = async () => {
    return api
      .getData()
      .then((ingredients) => {
        if (ingredients) {
          setIngredients(ingredients.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        /*  setState({ ...state, isLoading: false }); */
      });
  };

  const getIngredientsData = (cardData: any) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <IngredientContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients getData={getIngredientsData} />
        <BurgerConstructor openOrder={handleOrderClick} />
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
    </IngredientContext.Provider>
  );
}

export default App;