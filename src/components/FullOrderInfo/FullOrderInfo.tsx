/* cSpell:disable */
import styles from "./fullOrderInfo.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fullOrderInfo } from "../../services/reducers/order";
import Loader from "../Loader/Loader";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, AppDispatch } from "../../services/store";
import { IOrderNumber } from "../../services/types/types";


export const FullOrderInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderNumber = useParams<IOrderNumber>();

  const { orderData } = useAppSelector((state) => state.orderReducer);
  const { ingredients } = useAppSelector((state) => state.ingredientsReducer);

  useEffect(() => {
    dispatch(fullOrderInfo(orderNumber.orderNumber));
  }, [dispatch, orderNumber]);
  
  const orderInfo= orderData?.orders[0];

  let status = orderInfo?.status;

  if (status === "cancelled") {
    status = "Отменен";
  } else if (status === "done") {
    status = "Выполнен";
  } else {
    status = "Готовится";
  }
  let orderIngredients = Array.from(new Set(orderInfo?.ingredients));

  const getIngredientsInfo = () => {
    if (orderData) {
      return orderIngredients.map(
        (ingredient) =>
          ingredients.filter(
            (storeIngredient) => storeIngredient._id === ingredient
          )[0]
      );
    }
  };
  const count = (id: string) => {
    let counter = 0;
    orderInfo?.ingredients.forEach((ingredient) => {
      if (ingredient === id) {
        counter++;
      }
    });
    return counter;
  };

  const getFullPrice = () => {
    return orderIngredients
      .map(
        (ingredient) =>
          ingredients.filter(
            (storeIngredient) => storeIngredient._id === ingredient
          )[0]?.price
      )
      .reduce((acc, current) => {
        return acc + current;
      }, 0);
  };

  return (
    <>
      {orderData ? (
        <div className={styles.fullOrderInfo}>
          <h3
            className={`${styles.fullOrderInfo__orderNumber} text text_type_main-medium`}
          >
            #{orderNumber.orderNumber}
          </h3>
          <h2>{orderInfo?.name}</h2>
          {status ? (
            <span
              className={
                status === "Выполнен"
                  ? `text text_type_main-small ${styles.statusDone}`
                  : `text text_type_main-small`
              }
            >
              {status}
            </span>
          ) : (
            <></>
          )}
          {getIngredientsInfo() ? (
            <ul className={styles.fullOrderInfo__ingredientBox}>
              {getIngredientsInfo()?.map((ingredient, index) => {
                return (
                  <li className={styles.fullOrderInfo__listBox} key={index}>
                    <div className={styles.fullOrderInfo__box}>
                      <img
                        className={styles.fullOrderInfo__image}
                        src={ingredient?.image_mobile}
                        alt={ingredient?.name}
                      />
                      <h4 className="ml-10 text text_type_main-default">
                        {ingredient?.name}
                      </h4>
                    </div>
                    <div
                      className={`text text_type_digits-default ${styles.fullOrderInfo__priceBox}`}
                    >
                      <span className="ml-1 mr-1">{count(ingredient?._id)}</span>
                      x<span className="mr-2">{ingredient?.price}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Loader />
          )}
          <div className={styles.fullOrderInfo__footerBox}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(orderData?.orders[0].createdAt)}
            />
            <div className={styles.fullOrderInfo__priceBox}>
              <p className="mr-3 text text_type_digits-medium">
                {getFullPrice()}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
