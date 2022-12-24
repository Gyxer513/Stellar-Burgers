import styles from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  
    wsConnection,
    wsOffline,
 } from "../../services/reducers/webSocketRedusers";
import { BASE_WSS } from "../../utils/data"
import { useEffect } from 'react';

export const Feed = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(wsConnection(`${BASE_WSS}/orders/all`));
    return () => {
        dispatch(wsOffline());
    };
  }, []);
};
