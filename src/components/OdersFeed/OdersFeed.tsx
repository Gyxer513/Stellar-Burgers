import styles from "./ordersFeed.module.css";
import { OrderCard } from "../OrderCard/OrderCard";
import { IOrderFullInfo } from "../../services/types/types";
import { useAppSelector } from "../../services/store";

export const OrdersFeed = () => {
  const { orders } = useAppSelector((state) => state.webSocketReducers);
  return (
    <div className={styles.ordersFeed}>
      {orders?.map((order: IOrderFullInfo) => {
        return (
          <OrderCard
            createdAt={order.createdAt}
            number={order.number}
            name={order.name}
            orderIngredients={order.ingredients}
            key={order.number}
            status={order.status}
          />
        );
      })}
    </div>
  );
};
