import styles from "./fullOrderInfo.module.css"
import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { getFullOrderInfo } from "../../services/reducers/webSocketRedusers"

export const FullOrderInfo = () => {
    const dispatch = useDispatch()
    const orderNumber = useParams();

    const { orderData } = useSelector((state) => state.orderReducer);

    useEffect(() => {
        dispatch(getFullOrderInfo(orderNumber.orderNumber))
    }, [dispatch, orderNumber])
    console.log(orderNumber.orderNumber);
    return (
        <p></p>
    )
}