/* cSpell:disable */
import styles from "./OrdersInfo.module.css";
import { useAppSelector } from "../../services/store"

export const OrdersInfo = () => {
  const { orders, wsData } = useAppSelector((state) => state.webSocketReducers);
 
  const readyOrders = orders?.map((order) => {
    if (order.status === "done") {
      return (
        <li
          className={`${styles.ordersInfo__doneOrders} text_type_digits-default`}
          key={order.number}
        >
          {order.number}
        </li>
      );
    }
  });
  const ordersInProgress = orders?.map((order) => {
    if (order.status !== "done") {
      return (
        <li className="text_type_digits-default" key={order.number}>
          {order.number}
        </li>
      );
    }
  });
  return (
    <div className={styles.ordersInfo}>
      <div className={styles.ordersInfo__odersBox}>
        <div className={styles.ordersInfo__readyBox}>
          <h3 className={`text text_type_main-medium`}>Готовы:</h3>
          <ul className={styles.ordersInfo__orders}>{readyOrders}</ul>
        </div>
        <div className={styles.ordersInfo__inProgressBox}>
          <h3 className={`text text_type_main-medium`}>В работе:</h3>
          <ul className={styles.ordersInfo__orders}>{ordersInProgress}</ul>
        </div>
      </div>

      <div className={styles.ordersInfo__priceBox}>
        <div>
          <h4 className="text text_type_main-medium">
            Выполнено за все время:
          </h4>
          <p
            className={`${styles.ordersInfo__price} text text_type_digits-large`}
          >
            {wsData.total.toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
      <div className="mt-30">
        <h4 className="text text_type_main-medium">Выполнено за сегодня:</h4>
        <p
          className={`${styles.ordersInfo__price} text text_type_digits-large`}
        >
          {wsData.totalToday.toLocaleString("ru-RU")}
        </p>
      </div>
    </div>
  );
};
