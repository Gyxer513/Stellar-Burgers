import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { link } from "../../utils/data";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails"

function App() {
  const [state, setState] = useState({ api: [], isLoading: false });
  const [orderDetails, setOrderDetails] = useState({ isOpened: false });
  const [ingredientDetails, setIngredientDetails] = useState({
    isOpened: false,
    ingredient: null,
  });
  useEffect(() => {
    getData();
  }, []);
 
  const handleEscKeydown = (e: any) => {
    e.key === "Escape" && closeAllModals();
  };
  const openOrderDetails = () => {
    setOrderDetails({ ...orderDetails, isOpened: true });
}
  const closeAllModals = () => {
    setOrderDetails({ ...orderDetails, isOpened: false });
    setIngredientDetails({ ...ingredientDetails, isOpened: false });
  };
  const getData = async () => {
    return fetch(link)
      .then((response) => {
        return response.ok
          ? response.json()
          : setState({ ...state, isLoading: false });
      })
      .then((data) => {
        setState({ api: data.data, isLoading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.api} />
        <BurgerConstructor data={state.api} openOrder={openOrderDetails}/>
      </main>
      {orderDetails.isOpened &&
      <Modal
        title={""}
        onOverlayClick={closeAllModals}
        onEscKeydown={handleEscKeydown}
      >
        <OrderDetails orderId={`034536`} closeModal={closeAllModals} />
      </Modal>}
    </>
  );
}

export default App;
