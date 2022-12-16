/* cSpell:disable; */
import React from "react";
import styles from "./register.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  Input,
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerNewUser } from '../../services/reducers/authorization';
import { useDispatch } from 'react-redux';

export const Register = () => {
  const history = useHistory();
  const [userData, setUserData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  const { userName, email, password } = userData;
  const dispatch = useDispatch();
  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  const submitRegistration = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(registerNewUser({
      "email": email, 
      "password": password, 
      "name": userName 
  } )).then(res => console.log(res));
  history.push('/');
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
          value={password}
          name={"password"}
          onChange={onChange}
        />
      </div>
      <Button
        disabled={!userName || !email || !password} 
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
