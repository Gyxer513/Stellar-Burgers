import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  
    wsConnection,
    wsOffline,
 } from "../../services/reducers/webSocketRedusers";
import { BASE_WSS } from "../../utils/data"
import { useEffect } from 'react';
import { OrdersFeed } from "../../components/OdersFeed/OdersFeed"

export const Feed = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(wsConnection(`${BASE_WSS}/orders/all`));
    return () => {
        dispatch(wsOffline());
    };
  }, []);

return (
  <section className={styles.feed}>
  <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
  <OrdersFeed/>
  </section>
)
};
