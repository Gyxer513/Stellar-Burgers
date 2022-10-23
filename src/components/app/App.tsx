import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { ingredientsLink } from "../../utils/data";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IngredientContext } from "../../services/appContext";
import { orderLink } from "../../utils/data";

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
  
  const orderList = React.useMemo(()=>
    ingredients.map((ingredient: any) => ingredient._id), [ingredients]
  )
  const handleOrderClick = () => {
    getOrderId(orderList)
    .then((data) => setModalData(data.order.number))
  };
console.log(modalData);



  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
    handleOrderClick()
  };
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };
  const checkReponse = (res: any) =>
    res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));

  const getData = async () => {
    return fetch(ingredientsLink)
      .then(checkReponse)
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

  const getOrderId = async (orderList: any) =>
    await fetch(orderLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"ingredients": orderList}),
    }).then(checkReponse)
    





  const getIngridientsData = (cardData: any) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <IngredientContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients getData={getIngridientsData} />
        <BurgerConstructor openOrder={openOrderDetails} />
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
