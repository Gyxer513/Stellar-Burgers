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
import { randomId } from "../../utils/data";
const BurgerConstructor = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authorizationReducer);
  const { ingredients, chosenBun, chosenIngredients } = useSelector(
    (state) => state.ingredientsReducer
  );

  const handleDrop = (ingredientId) => {
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    if (targetIngredient.type === "bun") {
      dispatch(addBun(targetIngredient));
    } else {
      if (chosenBun != null) {
        dispatch(addIngredient(targetIngredient));
      }
    }
  };

  const handlePlaceOrder = () => {
    if (!userData) {
      history.push("/login");
    } else {
      history.push({
        pathname: "/order",
        state: {
          background: location,
        },
      });
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
      chosenBun?.price * 2 +
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
            text={`${chosenBun?.name} (????????)`}
            price={chosenBun?.price}
            thumbnail={chosenBun?.image}
          />
        </div>
      ) : (
        <p className="text text_type_main-large pt-20">???????????????????? ?????????? ????????</p>
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
            text={`${chosenBun?.name} (??????)`}
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
          ???????????????? ??????????
        </Button>
      </div>
    </section>
  );
};
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerConstructor;
