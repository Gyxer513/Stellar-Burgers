import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import rollImageOne from "../../images/bun-01.png";
import rollImageTwo from "../../images/bun-02.png";
import sauceOne from "../../images/sauce-01.png";
import sauceTwo from "../../images/sauce-02.png";
import sauceTree from "../../images/sauce-03.png";
import sauceFour from "../../images/sauce-04.png";
import styles from "./appIngredients.module.css";
import BurgerIngredient from "../BurgerIngridient/BurgerIngredient";

const AppIngredients = () => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={styles.burgerConstructor}>
      <div className="p-5"></div>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className="m-2"></div>
      <div style={{ display: "flex" }}>
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
      <div className={styles.burgerConstructor_container}>
        <p className="text text_type_main-medium">Булки</p>
        <div className={styles.burgerConstructor_rolls}>
          <BurgerIngredient
            src={rollImageOne}
            cost="20"
            text="Краторная булка N-200i"
          />
          <BurgerIngredient
            src={rollImageTwo}
            cost="20"
            text="Флюоресцентная булка R2-D3"
          />
        </div>
        <div className="m-5"></div>
        <p className="text text_type_main-medium">Соусы</p>
        <div className={styles.burgerConstructor_rolls}>
          <BurgerIngredient src={sauceTwo} cost="30" text="Соус Spicy-X" />
          <BurgerIngredient
            src={sauceFour}
            cost="30"
            text="Соус фирменный Space Sauce"
          />
        </div>
        <div className="m-5"></div>
        <div className={styles.burgerConstructor_rolls}>
          <BurgerIngredient
            src={sauceTree}
            cost="20"
            text="Краторная булка N-200i"
          />
          <BurgerIngredient
            src={sauceOne}
            cost="20"
            text="Флюоресцентная булка R2-D3"
          />
        </div>
      </div>
    </section>
  );
};

export default AppIngredients;
