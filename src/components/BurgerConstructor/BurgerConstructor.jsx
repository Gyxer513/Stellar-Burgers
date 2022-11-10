/* cSpell:disable; */
import React from "react";

import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./burgerConstructor.module.css";
import update from "immutability-helper";
import {
  addIngredient,
  addBun,
  sortIngredients,
} from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";
import ConstructorItem from "./ConstructorItem";

const BurgerConstructor = ({ openOrder }) => {
  const dispatch = useDispatch();
  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const chosenBun = useSelector((state) => state.ingredients.chosenBun);

  const handleDrop = (ingredientId) => {
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    if (targetIngredient.type === "bun") {
      dispatch(addBun(targetIngredient));
    } else {
      if (chosenBun != null) {
        dispatch(addIngredient([...chosenIngredients, targetIngredient]));
      }
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
      chosenBun?.price +
      chosenIngredients.reduce(
        (res, currentElement) => res + currentElement.price,
        0
      ),
    [chosenBun, chosenIngredients]
  );
  const moveIngredient = React.useCallback(
    (dragIndex, hoverIndex) => {
      const sortedIngredients = update(
        chosenIngredients,
        {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, chosenIngredients[dragIndex]],
          ],
        },
        [chosenIngredients]
      );

      dispatch(sortIngredients([...sortedIngredients]));
    },
    [chosenIngredients, dispatch]
  );

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
        {chosenBun != null && (
          <ul className={styles.burgerConstructor__elementsBox}>
            {chosenIngredients.map((item, index) => {
              if (item.type != "bun") {
                return (
                  <ConstructorItem
                    key={item.randomId}
                    index={index}
                    moveIngredient={moveIngredient}
                    data={item}
                    id={`${item._id}${index}`}
                  />
                );
              }
            })}
          </ul>
        )}
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
          <p className="text text_type_main-large">
            {!totalPrice ? 0 : totalPrice}
          </p>
          <div className="m-2"></div>
          <CurrencyIcon type="primary" />
          <div className="m-2"></div>
          <Button
            disabled={
              chosenIngredients.length > 0 || chosenBun != null ? false : true
            }
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
