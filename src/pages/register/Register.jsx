/* cSpell:disable; */
import React from "react";
import styles from "./register.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Register = () => {
  const [userData, setUserData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  const { userName, email, password } = userData;
  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  const submitRegistration = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(userData);
  };
  return (
    <form onSubmit={submitRegistration} className={styles.register}>
      <h2 className="m-10 text text_type_main-medium">Регистрация</h2>
      <div className={styles.register__input}>
      <Input
          type={"text"}
          name={"userName"}
          placeholder={"Имя"}
          value={userName}
          onChange={onChange}
        /> 
      </div>
      <div className={styles.register__input}>
        <EmailInput
          type={"text"}
          placeholder={"E-mail"}
          value={email}
          name={"email"}
          errorText={"Ошибка в email"}
          error={false}
          size={"default"}
          onChange={onChange}
        />
      </div>
      <div className={styles.register__input}>
        <PasswordInput
          type={"text"}
          placeholder={"Пароль"}
          value={password}
          name={"password"}
          errorText={"Ошибка в пароле"}
          onChange={onChange}
          icon={'ShowIcon'}
        />
      </div>
      <Button
        disabled={userName && email}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Зарегистрироваться
      </Button>
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
    </form>
  );
};
