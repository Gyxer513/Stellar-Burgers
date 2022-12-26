import styles from "./ordersFeed.module.css";
import { useSelector } from "react-redux";
import { OrderCard } from "../OrderCard/OrderCard";

export const OrdersFeed = () => {
  const { orders } = useSelector((state) => state.webSocketReducers);
  return (
      <div className={styles.ordersFeed}>
        {orders?.map((order) => {
          return (
            <OrderCard
              date={order.createdAt}
              number={order.number}
              name={order.name}
              orderIngredients={order.ingredients}
              price={order.price}
              key={order.number}
              status={order.status}
            />
          );
        })}
      </div>
  );
};
