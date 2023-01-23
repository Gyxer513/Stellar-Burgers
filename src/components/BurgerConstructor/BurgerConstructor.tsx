/* cSpell:disable; */
import React from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import styles from "./burgerConstructor.module.css";
import update from "immutability-helper";
import {
  addIngredient,
  addBun,
  sortIngredients,
} from "../../services/reducers/ingredients";
import { useDrop } from "react-dnd";
import ConstructorItem from "./ConstructorItem";
import { useHistory, useLocation } from "react-router-dom";
import { useAppSelector, AppDispatch } from "../../services/store";
import { Iingredient } from "../../services/types/ingredients";

const BurgerConstructor = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useAppSelector((state) => state.authorizationReducer);
  const { ingredients, chosenBun, chosenIngredients } = useAppSelector(
    (state) => state.ingredientsReducer
  );

  const handleDrop = (ingredientId: Iingredient) => {
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    if (targetIngredient?.type === "bun") {
      dispatch(addBun(targetIngredient));
    } else {
      if (chosenBun != null) {
        dispatch(addIngredient(targetIngredient));
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!userData) {
      history.push("/Stellar-Burgers/login");
    } else {
      history.push({
        pathname: "/Stellar-Burgers/order",
        state: {
          background: location,
        },
      });
    }
  };

  const [, burgerIngredientsContainer] = useDrop({
    accept: "ingredient",
    drop(ingredientId: Iingredient) {
      handleDrop(ingredientId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = React.useMemo<number>(
    () =>
      chosenBun?.price! * 2 +
// @ts-ignore
      chosenIngredients.reduce(
        (res: number, currentElement: Iingredient) => res + currentElement.price,
        0
      ),
    [chosenBun, chosenIngredients]
  );
  const moveIngredient = React.useCallback(
    (dragIndex: number, hoverIndex: any) => {
      const sortedIngredients = update(
        chosenIngredients,
        {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, chosenIngredients[dragIndex]],
          ],
        },
      );
      dispatch(sortIngredients([...sortedIngredients]));
    },
    [chosenIngredients, dispatch]
  );

  return (
    <section
      ref={burgerIngredientsContainer}
      className={styles.burgerConstructor}
    >
      {chosenBun != null ? (
        <div className={styles.burgerConstructor__element}>
          <ConstructorElement
            key={"bunTop"}
            type="top"
            isLocked={true}
            text={`${chosenBun?.name} (верх)`}
            price={chosenBun?.price}
            thumbnail={chosenBun?.image}
          />
        </div>
      ) : (
        <p className="text text_type_main-large pt-20">Перетащите булку сюда</p>
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
            key={"bunBottom"}
            type="bottom"
            isLocked={true}
            text={`${chosenBun?.name} (Низ)`}
            price={chosenBun?.price}
            thumbnail={chosenBun?.image}
          />
        </div>
      )}
      <div className={styles.burgerConstructor__box}>
        <p className="text text_type_main-large">{totalPrice || 0}</p>
        <div className="m-2"></div>
        <CurrencyIcon type="primary" />
        <div className="m-2"></div>
        <Button
          disabled={!totalPrice || 0 || chosenIngredients.length === 0}
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
export default BurgerConstructor;
