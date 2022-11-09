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
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./burgerConstructor.module.css";
import { addIngredient, addBun, deleteIngredient } from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";

const BurgerConstructor = ({ openOrder }) => {
  const dispatch = useDispatch();
  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );
  const ingredients = useSelector(
    (state) => state.ingredients.ingredients
  );
  const chosenBun = useSelector((state) => state.ingredients.chosenBun);

  const handleDrop = (ingredientId) => {
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    if (targetIngredient.type === "bun") {
      dispatch(addBun(targetIngredient));
    } else {
      dispatch(addIngredient([...chosenIngredients, targetIngredient]));
    }
  };
  const [, burgerIngredientsContainer] = useDrop({
    accept: "ingredient",
    drop(ingredientId) {
      handleDrop(ingredientId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const totalPrice = React.useMemo(
    () =>
      chosenIngredients.reduce(
        (res, currentElement) =>
          currentElement.type === "bun"
            ? res + currentElement.price * 2
            : res + currentElement.price,
        0
      ),
    [chosenIngredients]
  );
  const handleDeleteIngredient = (item) => () => {
    const arrayClone = chosenIngredients.slice();
    arrayClone.splice(chosenIngredients.indexOf(item), 1);
    dispatch(deleteIngredient(arrayClone))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section
        ref={burgerIngredientsContainer}
        className={styles.burgerConstructor}
      >
        {chosenBun != null ? (
          <div className={styles.burgerConstructor__element}>
             <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenBun?.name} (верх)`}
              price={chosenBun?.price}
              thumbnail={chosenBun?.image}
            />
          </div>
        ) : (
          <p className="text text_type_main-large pt-20">
            Перетащите булку сюда
          </p>
        )}
        <div className="m-4"></div>
        <ul className={styles.burgerConstructor__elementsBox}>
          {chosenIngredients.map((item, index) => {
            if (item.type != "bun") {
              return (
                <li
                  key={index}
                  className={styles.burgerConstructor__elementBox}
                >
                  <DragIcon type="primary" />
                  <div className="m-5"></div>
                  <ConstructorElement
                    isLocked={false}
                    text={item.name}
                    thumbnail={item.image}
                    price={item.price}
                    handleClose={handleDeleteIngredient(item)}
                  />
                </li>
              );
            }
          })}
        </ul>
        <div className="m-1"></div>
        {chosenBun != null && (
          <div className={styles.burgerConstructor__element}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${chosenBun?.name} (Низ)`}
              price={chosenBun?.price}
              thumbnail={chosenBun?.image}
            />
          </div>
        )}
        <div className={styles.burgerConstructor__box}>
          <p className="text text_type_main-large">{totalPrice}</p>
          <div className="m-2"></div>
          <CurrencyIcon type="primary" />
          <div className="m-2"></div>
          <Button
            disabled={(chosenIngredients.length > 0 || chosenBun != null)  ? false : true}
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
