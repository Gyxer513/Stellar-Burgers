/* cSpell:disable */
import styles from "./orderDetails.module.css";
import doneImg from "../../images/done.png";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendData } from "../../services/actions/order";

function OrderDetails() {
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(sendData(orderList));
  }, [dispatch]);

  const orderData = useSelector((state) => state.order.orderDetails);
  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );

  const chosenBun = useSelector((state) => state.ingredients.chosenBun);
  
  const orderList = React.useMemo(
    () => {
      const ingredientsList = chosenIngredients?.map((ingredient) => ingredient._id)
      ingredientsList.splice(0, 0, chosenBun?._id)
      ingredientsList.splice(ingredientsList.length, 0, chosenBun?._id)
      return ingredientsList
    },
    [chosenIngredients, chosenBun]
  );
  
  return (
    <div className={styles.order}>
      <div className="m-10"></div>
      <h2 className="text text_type_digits-large">{orderData}</h2>
      <div className="m-5"></div>
      <p className="text text_type_main-medium">Идентификатор заказа</p>
      <img className="m-10" src={doneImg} alt="Ваш заказ принят" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p
        className={`text text_type_main-default m-5 ${styles.order__colorText}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
      <div className="m-10"></div>
    </div>
  );
}



export default OrderDetails;
