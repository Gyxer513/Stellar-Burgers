/* cSpell:disable */
import React from "react";
import styles from "./resetPassword.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { updatePass } from "../../services/reducers/authorization";
import { useDispatch } from "react-redux";

import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResertPassword = () => {
  const [InputData, setInputData] = React.useState({
    password: "",
    resetCode: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setInputData({
      ...InputData,
      [e.target.name]: e.target.value,
    });
  };
  const submitAutorization = (e) => {
    e.preventDefault();
    dispatch(
      updatePass({
        password: InputData.password,
        token: InputData.resetCode,
      })
    );
    history.push("/");
  };
  return (
    <form onSubmit={submitAutorization} className={styles.login}>
      <h2 className="m-10 text text_type_main-medium">Вход</h2>
      <div className={styles.ResertPassword__input}>
        <PasswordInput
          type={"text"}
          placeholder="Введите новый пароль"
          value={InputData.password}
          name={"password"}
          size={"default"}
          onChange={onChange}
        />
      </div>
      <div className={styles.ResertPassword__input}>
        <Input
          placeholder="Введите код из письма"
          value={InputData.resetCode}
          name={"resetCode"}
          onChange={onChange}
        />
      </div>
      <Button
        disabled={!InputData.password || !InputData.resetCode}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Войти
      </Button>
      <div className={styles.ResertPassword__register}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
          Вспомнили пароль?
        </p>
        <NavLink
          to="/register"
          className={`${styles.ResertPassword__link} text text_type_main-default text_color_inactive `}
        >
          Войти
        </NavLink>
      </div>
      <div className={styles.ResertPassword__reset}></div>
    </form>
  );
};
