import React from "react";
import sauceOne from "../../images/sauce-01.png";
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
      <div className={styles.burgerConstructor__elementsBox} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div className={styles.burgerConstructor__element}>
          <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={sauceOne}
        />
      </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__element}>
          <ConstructorElement
          
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={sauceOne}
        />
      </div>
      <div className={styles.burgerConstructor__element}>
          <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={sauceOne}
        />
      </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        <div className={styles.burgerConstructor__elementBox}>
          <DragIcon type="primary" />
          <div className="m-5"></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={sauceOne}
          />
        </div>
        </div>
      <div className={styles.burgerConstructor__box}>
        <p className="text text_type_main-large">610</p>
        <div className="m-2"></div>
        <CurrencyIcon type="primary" />
        <div className="m-2"></div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
