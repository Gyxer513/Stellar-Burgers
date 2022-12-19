/* cSpell:disable */
import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { Link, useLocation} from 'react-router-dom';
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { selectIngredientData } from "../../services/reducers/ingredients";

const BurgerIngredient = ({ data, openModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { image, price, name, _id } = data;
  const { chosenBun, chosenIngredients, selectIngredient } = useSelector(
    (state) => state.ingredientsReducer
  );
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const handleClick = () => {
    openModal();
    dispatch(selectIngredientData(data));
  };

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
    return ingredientCounter;
  };

  return (
    <Link className={styles.burgerIngredient__link}  to={{
      pathname: `/ingredients/${data._id}`,
      state: { background: location },
      }}>
    <div
      disabled={true}
      ref={dragRef}
      className={styles.burgerIngredient}
      onClick={handleClick}
    >
      {count() > 0 && <Counter count={count()} size="default" />}
      <img className="ingredient__image" src={image} alt={name} id={_id} />
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
    </Link >
  );
};
BurgerIngredient.propType = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};
export default BurgerIngredient;
