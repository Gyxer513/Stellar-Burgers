import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import { IngredientContext } from "../../services/appContext";


const BurgerConstructor = ({ openOrder}) => {
  const ingredients = React.useContext(IngredientContext);

  const totalPrice = React.useMemo(
    () =>
      ingredients.reduce(
        (res, currentElement) =>
          currentElement.type === "bun"
            ? res + currentElement.price * 2
            : res + currentElement.price,
        0
      ),
    [ingredients]
  );

  return (
    <section className={styles.burgerConstructor}>
      <div className={styles.burgerConstructor__element}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredients[0]?.name} (верх)`}
          price={ingredients[0]?.price}
          thumbnail={ingredients[0]?.image}
        />
      </div>
      <div className="m-4"></div>
      <ul className={styles.burgerConstructor__elementsBox}>
        {ingredients.map((item, index) => {
          if (item.type !== "bun") {
            return (
              <li key={index} className={styles.burgerConstructor__elementBox}>
                <DragIcon type="primary" />
                <div className="m-5"></div>
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className="m-1"></div>
      <div className={styles.burgerConstructor__element}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0]?.name} (Низ)`}
          price={ingredients[0]?.price}
          thumbnail={ingredients[0]?.image}
        />
      </div>
      <div className={styles.burgerConstructor__box}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <div className="m-2"></div>
        <CurrencyIcon type="primary" />
        <div className="m-2"></div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={openOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
