import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appIngredients.module.css";
import ingridients from "../utils/data";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngridient/BurgerIngredient";
import ingredientPropType from "../utils/prop-types";
const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={styles.burgerConstructor}>
      <div className="p-5"></div>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className="m-2"></div>
      <div className={styles.burgerConstructor__TabBox}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className="m-5"></div>
      <div className={`${styles.burgerConstructor__ingridientsBox}`}>
        <div className={styles.burgerConstructor_container}>
          <div className="m-10"></div>
          <p className="text text_type_main-medium">Булки</p>
          <div className={styles.burgerConstructor_rolls}>
            {ingridients.map((item, index) => {
              if (item.type == "bun") {
                return (
                  <BurgerIngredient
                    key={index}
                    src={item.image}
                    cost={item.price}
                    text={item.name}
                  />
                );
              }
            })}
          </div>
          <div className="m-20"></div>
          <p className="text text_type_main-medium">Соусы</p>
          <div className={styles.burgerConstructor_rolls}>
            {ingridients.map((item, index) => {
              if (item.type == "sauce") {
                return (
                  <BurgerIngredient
                    key={index}
                    src={item.image}
                    cost={item.price}
                    text={item.name}
                  />
                );
              }
            })}
          </div>
          <div className={styles.burgerConstructor_rolls}>
            {ingridients.map((item, index) => {
              if (item.type == "main") {
                return (
                  <BurgerIngredient
                    key={index}
                    src={item.image}
                    cost={item.price}
                    text={item.name}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


BurgerIngredient.propType = {
  src: PropTypes.any.isRequired,
  cost: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}
export default BurgerIngredients;
