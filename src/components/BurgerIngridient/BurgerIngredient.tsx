/* cSpell:disable */
import React, { FC } from "react";
import { Link, useLocation} from 'react-router-dom';
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../services/store"
import { Iingredient } from "../../services/types/ingredients";

const BurgerIngredient: FC<{data: Iingredient}> = ( { data } ) => {
  const location = useLocation();
  const { image, price, name, _id } = data;
  const { chosenBun, chosenIngredients } = useAppSelector(
    (state) => state.ingredientsReducer
  );
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });



  const count = React.useMemo(() => {
    let ingredientCounter = 0;
    if (chosenBun?._id == _id) {
      ingredientCounter = 2;
    } else {
      chosenIngredients?.forEach((ingredient: Iingredient) => {
        if (ingredient.name === name) {
          ingredientCounter += 1;
        }
      });
    }
    return ingredientCounter;
  }, [chosenBun, chosenIngredients]);
  
  return (
    <Link className={styles.burgerIngredient__link} to={{
      pathname: `/Stellar-Burgers/ingredients/${_id}`,
      state: {background: location}
      }}>
    <div
      ref={dragRef}
      className={styles.burgerIngredient}
    >
      {count > 0 && <Counter count={count} size="default" />}
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

export default BurgerIngredient;
