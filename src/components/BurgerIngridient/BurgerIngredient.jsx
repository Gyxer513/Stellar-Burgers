import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";


const BurgerIngredient = ({ data, getData }) => {
  return (
    <div className={styles.burgerIngredient} onClick={() => getData(data)}>
      <Counter count={1} size="default" />
      <img className="ingridient__image" src={data.image} alt={data.name} />
      <div className={styles.burgerIngredient__costBox}>
        <p
          className={`text text_type_main-small ${styles.burgerIngredient__cost}`}
        >
          {data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{data.name}</p>
    </div>
  );
};
BurgerIngredient.propType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  getData: PropTypes.func.isRequired,
};
export default BurgerIngredient;
