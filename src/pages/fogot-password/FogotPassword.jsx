import React from "react";
import styles from "./fogotPassword.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const FogotPassword = () => {
  return (
    <section className={styles.fogotPassword}>
      <h2 className="m-10 text text_type_main-medium">Восстановить пароль</h2>
      <div className={styles.fogotPassword__input}>
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
      <Button>Восстановить</Button>
      <div className={styles.fogotPassword__text}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
          Вспомнили пароль?
        </p>
        <NavLink
          to="/login"
          className={`${styles.fogotPassword__link} text text_type_main-default text_color_inactive `}
        >
          Войти
        </NavLink>
      </div>
    </section>
  );
};
