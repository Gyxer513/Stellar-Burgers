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
import { addIngredient } from '../../services/actions/ingredients';
import { useDrop } from "react-dnd";

const BurgerConstructor = ({ openOrder }) => {
  const dispatch = useDispatch();
  const chosenIngredients = useSelector(
    (state) => state.ingredients.chosenIngredients
  );
  const initialIngredients = useSelector(state => state.ingredients.ingredients);
  const initialBun = useSelector(state => state.ingredients.chousenBun);

  const handleDrop = (ingredientId) => {
    const targetIngredient = initialIngredients.find(
      (ingredient) => ingredient._id === ingredientId._id
    );
    /* console.log(targetIngredient);
    console.log(chosenIngredients); */
/*      const selectedBun = chosenIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );
    const selectedBunIndex = chosenIngredients.indexOf(selectedBun);
 */
/* if (targetIngredient.type = "bun") {
  console.log(targetIngredient.type);
  dispatch(bunData([...initialBun, targetIngredient]))
} else {
  return targetIngredient
} */
   
      dispatch(addIngredient([...chosenIngredients, targetIngredient]));
      
    console.log(initialBun);
  };
  const [, burgerIngredientsContainer] = useDrop({
    accept: "ingredient",
    drop(ingredientId) {
      handleDrop(ingredientId);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
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

  return (
    <DndProvider backend={HTML5Backend}>
      <section ref={burgerIngredientsContainer}  className={styles.burgerConstructor}>
        {chosenIngredients.length > 0 ? (
          <div className={styles.burgerConstructor__element}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${chosenIngredients[0]?.name} (верх)`}
              price={chosenIngredients[0]?.price}
              thumbnail={chosenIngredients[0]?.image}
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
            if (item.type !== "bun") {
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
                  />
                </li>
              );
            }
          })}
        </ul>
        <div className="m-1"></div>
        {chosenIngredients.length > 0 && (
          <div className={styles.burgerConstructor__element}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${chosenIngredients[0]?.name} (Низ)`}
              price={chosenIngredients[0]?.price}
              thumbnail={chosenIngredients[0]?.image}
            />
          </div>
        )}
        <div className={styles.burgerConstructor__box}>
          <p className="text text_type_main-large">{totalPrice}</p>
          <div className="m-2"></div>
          <CurrencyIcon type="primary" />
          <div className="m-2"></div>
          <Button
            disabled={chosenIngredients.length > 0 ? false : true}
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
