import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { componentLink } from "../../utils/data";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IngredientContext } from "../../services/appContext"

function App() {
  const [state, setState] = useState({ api: [], isLoading: false });
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    getData();
  }, []);

  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
  };
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };

  const getData = async () => {
    return fetch(componentLink)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
      .then(ingredients => {
        if (ingredients) {
          setIngredients(ingredients.data)
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
       /*  setState({ ...state, isLoading: false }); */
      })

 
  };
  const getIngridientsData = (cardData: any) => {
    setIngredientDetails({ isOpened: true, ingredient: cardData });
  };
  return (
    <IngredientContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients  getData={getIngridientsData} />
        <BurgerConstructor  openOrder={openOrderDetails} />
      </main>
      {orderDetails.isOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails orderId={`034536`} />
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
