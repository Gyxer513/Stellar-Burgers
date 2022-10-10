import React from "react";
import bun from "../../images/bun-02.png";
import ingridients from "../utils/data";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";

const BurgerConstructor = () => {
  return (
    <section className={styles.burgerConstructor}>
      <div className={styles.burgerConstructor__element}>
        <ConstructorElement
        
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={20}
          thumbnail={bun}
        />
      </div>
      <div className="m-4"></div>
      <ul className={styles.burgerConstructor__elementsBox}>
          {ingridients.map((item, index) => (
            <li key={index} className={styles.burgerConstructor__elementBox}>
            <DragIcon type="primary" />
            <div className="m-5"></div>
            <ConstructorElement  isLocked={false} text={item.name} thumbnail={item.image} />
            </li>
          ))}
      </ul>
      <div className="m-4"></div>
      <div className={styles.burgerConstructor__element}>
        <ConstructorElement
       
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={20}
          thumbnail={bun}
        />
      </div>

      <div className={styles.burgerConstructor__box}>
        <p className="text text_type_main-large">610</p>
        <div className="m-2"></div>
        <CurrencyIcon type="primary" />
        <div className="m-2"></div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
