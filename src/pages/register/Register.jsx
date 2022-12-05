import React from "react";
import styles from "./register.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {
  return (
    <section className={styles.register}>
      <h2 className="m-10 text text_type_main-medium">Вход</h2>
      <div className={styles.register__input}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          value={""}
          name={"e-mail"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className={styles.register__input}>
        <Input
          type={"text"}
          placeholder={"E-mail"}
          value={""}
          name={"e-mail"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className={styles.register__input}>
        <PasswordInput
          type={"text"}
          placeholder={"E-mail"}
          value={""}
          name={"e-mail"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <Button>Войти</Button>
      <div className={styles.register__register}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
        Уже зарегистрированы?
        </p>
        <NavLink
          to="/login"
          className={`${styles.register__link} text text_type_main-default text_color_inactive `}
          activeClassName={styles.register__link_active}
        >
          Войти
        </NavLink>
      </div>
    </section>
  );
};
