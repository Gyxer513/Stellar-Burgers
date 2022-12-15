/* cSpell:disable; */
import React from "react";
import styles from "./forgotPassword.module.css";
import { NavLink } from "react-router-dom";
import { fogotPass } from "../../services/reducers/authorization";
import { useDispatch } from "react-redux";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const dispatch = useDispatch();
  const onChange = (e) => {
    setEmailValue(e.target.value);
  };
  const submitResetPassword = (e) => {
    e.preventDefault();
    console.log(emailValue);
    dispatch(
      fogotPass({
        email: emailValue,
      })
    ).then((res) => console.log(res));
  };
  return (
    <form onSubmit={submitResetPassword} className={styles.forgotPassword}>
      <h2 className="m-10 text text_type_main-medium">Восстановить пароль</h2>
      <div className={styles.forgotPassword__input}>
        <EmailInput
          type={"text"}
          placeholder={"E-mail"}
          value={emailValue}
          name={"email"}
          errorText={"Ошибка в email"}
          error={false}
          size={"default"}
          onChange={onChange}
        />
      </div>
      <Button
        disabled={!emailValue}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Восстановить
      </Button>
      <div className={styles.forgotPassword__text}>
        <p className={`text text_type_main-default text_color_active mr-2`}>
          Вспомнили пароль?
        </p>
        <NavLink
          to="/login"
          className={`${styles.forgotPassword__link} text text_type_main-default text_color_inactive `}
        >
          Войти
        </NavLink>
      </div>
    </form>
  );
};
