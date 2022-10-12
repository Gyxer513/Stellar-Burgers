import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";

const BurgerIngredient = ({ src, cost, name, text }) => {
  return (
    <div className={styles.burgerIngredient}>
      <img className="ingridient__image" src={src} alt={name} />
      <div className={styles.burgerIngredient__costBox}>
        <p
          className={`text text_type_main-small ${styles.burgerIngredient__cost}`}
        >
          {cost}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{text}</p>
    </div>
  );
};
BurgerIngredient.propType = {
  src: PropTypes.any.isRequired,
  cost: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}
export default BurgerIngredient;
