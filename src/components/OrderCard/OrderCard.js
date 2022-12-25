import styles from "./orderCard.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
export const OrderCard = ({
  orderIngredients,
  status,
  name,
  number,
  date,
}) => {
  const { ingredients } = useSelector((state) => state.ingredientsReducer);

  if (status === "cancelled") {
    status = "Отменен";
  } else if (status === "done") {
    status = "Выполнен";
  } else {
    status = "Готовится";
  }

  const getImage = () => {
    return orderIngredients.map(
      (ingredient) =>
        ingredients.filter(
          (storeIngredient) => storeIngredient._id === ingredient
        )[0].image_mobile
    );
  };
  const getPrice = () => {
    return orderIngredients
      .map(
        (ingredient) =>
          ingredients.filter(
            (storeIngredient) => storeIngredient._id === ingredient
          )[0].price
      )
      .reduce((acc, current) => {
        return acc + current;
      }, 0);
  };
  return (
    <Link className={styles.orderCard}>
      <div className={styles.orderCard__header}>
        <h3 className={`text text_type_digits-default`}>#{number}</h3>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(date)}
        />
      </div>
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
      <h2 className="text text_type_main-medium">{name}</h2>
      <div className={styles.orderCard__box}>
        <ul className={styles.orderCard__imageBox}>
          {getImage()?.map((image, index) => {
            return (
              <li
                key={index}
                className={styles.orderCard__listImage}
                style={{ zIndex: 6 - index }}
              >
                <img className={styles.orderCard__image} src={image} />
              </li>
            );
          })}
        </ul>
        <div className={styles.orderCard__priceBox}>
          <p className="mr-3 text text_type_digits-medium">{getPrice()}</p>
          <CurrencyIcon />
        </div>
      </div>
    </Link>
  );
};
