/* cSpell:disable; */
import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from "./burgerConstructor.module.css";

const BurgerConstructor = ({ openOrder }) => {
  const Ingredients = [];
  const [buttonDisable, setButtonDisable] = React.useState("disabled");
  const chosenIngredients = useSelector(state => state.ingredients.chosenIngredients);
 

  const totalPrice = React.useMemo(
    () =>
      Ingredients.reduce(
        (res, currentElement) =>
          currentElement.type === "bun"
            ? res + currentElement.price * 2
            : res + currentElement.price,
        0
      ),
    [Ingredients]
  );

  return (
    <DndProvider backend={HTML5Backend}>
    <section className={styles.burgerConstructor}>
      {chosenIngredients.length > 0 ? <div className={styles.burgerConstructor__element}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${Ingredients[0]?.name} (верх)`}
          price={Ingredients[0]?.price}
          thumbnail={Ingredients[0]?.image}
        />
      </div> : <p className="text text_type_main-large pt-20">
              Перетащите булку сюда
            </p>}
      <div className="m-4"></div>
      <ul className={styles.burgerConstructor__elementsBox}>
        {Ingredients.map((item, index) => {
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
       {chosenIngredients.length > 0 && <div className={styles.burgerConstructor__element}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${Ingredients[0]?.name} (Низ)`}
          price={Ingredients[0]?.price}
          thumbnail={Ingredients[0]?.image}
        />
      </div>}
      <div className={styles.burgerConstructor__box}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <div className="m-2"></div>
        <CurrencyIcon type="primary" />
        <div className="m-2"></div>
        <Button
          disabled={buttonDisable}
          htmlType="button"
          type="primary"
          size="medium"
          onClick={openOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
    </DndProvider>
  );
};
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  openOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
