/* cSpell:disable; */
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import {
  wsConnection,
  wsOffline,
} from "../../services/reducers/webSocketRedusers";
import { BASE_WSS } from "../../utils/data";
import { useEffect } from "react";
import { OrdersFeed } from "../../components/OdersFeed/OdersFeed";
import Loader from "../../components/Loader/Loader";
import { OrdersInfo } from "../../components/OrdersInfo/OrdersInfo";
import { AppDispatch, useAppSelector} from "../../services/store"

export const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useAppSelector((state) => state.webSocketReducers);

  useEffect(() => {
    dispatch(wsConnection(`${BASE_WSS}/all`));
    return () => {
      dispatch(wsOffline());
    };
  }, []);

  return (
    <section className={styles.feed}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div className={styles.feed__box}>
        <div>{orders ? <OrdersFeed /> : <Loader />}</div>
        <div className="ml-10">{orders ? <OrdersInfo /> : <Loader />}</div>
      </div>
    </section>
  );
};
