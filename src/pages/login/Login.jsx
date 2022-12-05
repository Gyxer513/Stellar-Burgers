/* cSpell:disable */
import React from "react";
import styles from "./login.module.css";
import { NavLink } from "react-router-dom";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {
  return (
    <section className={styles.login}>
      <h2 className="m-10 text text_type_main-medium">Вход</h2>
      <div className={styles.login__input}>
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
      <div className={styles.login__input}>
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
      <div className={styles.login__register}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
          Вы — новый пользователь?
        </p>
        <NavLink
          to="/register"
          className={`${styles.login__link} text text_type_main-default text_color_inactive `}
        >
          Зарегистрироваться
        </NavLink>
      </div>
      <div className={styles.login__reset}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
          Забыли пароль?
        </p>
        <NavLink
          to="/forgot-password"
          className={`${styles.login__link} text text_type_main-default text_color_inactive `}
        >
          Восстановить пароль
        </NavLink>
      </div>
    </section>
  );
};
