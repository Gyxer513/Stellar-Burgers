/* cSpell:disable */
import React from "react";
import styles from "./login.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { loginUser } from "../../services/reducers/authorization";
import { useDispatch } from "react-redux";

import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Login = () => {
  const history = useHistory();
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;
  const dispatch = useDispatch();
  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const submitAutorization = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email,
        password: password,
      }),
      history.push("/")
    );
  };
  return (
    <form onSubmit={submitAutorization} className={styles.login}>
      <h2 className="m-10 text text_type_main-medium">Вход</h2>
      <div className={styles.login__input}>
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
      <div className={styles.login__input}>
        <PasswordInput value={password} name={"password"} onChange={onChange} />
      </div>
      <Button
        disabled={!email || !password}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Войти
      </Button>
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
    </form>
  );
};
