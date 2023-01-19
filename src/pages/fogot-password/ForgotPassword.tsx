/* cSpell:disable; */
import React, { FormEvent } from "react";
import styles from "./forgotPassword.module.css";
import { NavLink, Redirect } from "react-router-dom";
import { fogotPass } from "../../services/reducers/authorization";
import { useDispatch } from "react-redux";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector, AppDispatch } from "../../services/store"

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { resetStatus } = useAppSelector((state) => state.authorizationReducer);
  const onChange = (e: any) => {
    setEmailValue(e.target.value);
  };
  const submitResetPassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      fogotPass({
        email: emailValue,
      })
    );
    setEmailValue("");
  };

  if (resetStatus) {
    return <Redirect to="/reset-password"></Redirect>;
  }

  return (
    <form onSubmit={submitResetPassword} className={styles.forgotPassword}>
      <h2 className="m-10 text text_type_main-medium">Восстановить пароль</h2>
      <div className={styles.forgotPassword__input}>
        <EmailInput
          placeholder={"E-mail"}
          value={emailValue}
          name={"email"}
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
