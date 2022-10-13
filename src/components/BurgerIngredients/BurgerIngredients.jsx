import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngridient/BurgerIngredient";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerIngredients = ({ data, getData }) => {
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
            {data.map((item) => {
              if (item.type == "bun") {
                return (
                  <BurgerIngredient
                    key={item._id}
                    data={item}
                    getData={getData}
                  />
                );
              }
            })}
          </div>
          <div className="m-20"></div>
          <p className="text text_type_main-medium">Соусы</p>
          <div className={styles.burgerConstructor_rolls}>
            {data.map((item, index) => {
              if (item.type == "sauce") {
                return (
                  <BurgerIngredient
                    key={item._id}
                    data={item}
                    getData={getData}
                  />
                );
              }
            })}
          </div>
          <div className="m-20"></div>
          <p className="text text_type_main-medium">Начинки</p>
          <div className={styles.burgerConstructor_rolls}>
            {data.map((item, index) => {
              if (item.type == "main") {
                return (
                  <BurgerIngredient
                    key={item._id}
                    data={item}
                    getData={getData}
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
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  getData: PropTypes.func.isRequired,
};
export default BurgerIngredients;
