/* cSpell:disable */
import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const BurgerIngredient = ({ data, getData }) => {
  const { image, price, name, _id } = data;
  const chosenBun = useSelector((state) => state.ingredients.chosenBun);

  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  

  const count = () => {
    let ingredientCounter = 0;
    if (chosenBun?._id == _id) {
      ingredientCounter = 2;
    } else {
      chosenIngredients?.forEach((ingredient) => {
        if (ingredient.name === name) {
          ingredientCounter += 1;
        }
      });
    }
    return ingredientCounter
  };

  return (
    <div
      disabled={true}
      ref={dragRef}
      className={styles.burgerIngredient}
      onClick={() => getData(data)}
    >
      {count() > 0 && (
        <Counter count={count()} size="default" />
      )}
      <img className="ingridient__image" src={image} alt={name} id={_id} />
      <div className={styles.burgerIngredient__costBox}>
        <p
          className={`text text_type_main-small ${styles.burgerIngredient__cost}`}
        >
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`text text_type_main-small ${styles.burgerIngredient__text}`}
      >
        {name}
      </p>
    </div>
  );
};
BurgerIngredient.propType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  getData: PropTypes.func.isRequired,
};
export default BurgerIngredient;
