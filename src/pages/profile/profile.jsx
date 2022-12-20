/* cSpell:disable */
import React from "react";
import styles from "./profile.module.css";
import { Link, useHistory, Route, Switch } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logout, updateUserData } from "../../services/reducers/authorization";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.authorizationReducer);
  const [loginData, setLoginData] = React.useState({
    userName: userData.name,
    email: userData.email,
    password: "",
  });

  const logoutUser = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(
      logout({
        token: refreshToken,
      })
    );
    history.push("/login");
  };
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const submitData = (e) => {
    e.preventDefault();
    const refreshToken = getCookie('accessToken');
    console.log(refreshToken);
    dispatch(
      updateUserData(refreshToken, {
        email: loginData.email,
        password: loginData.password,
        name: loginData.name,
      })
    );
  };

  const reverse = () => {
    setLoginData( {
      userName: userData.name,
      email: userData.email,
      password: "",
    });
  };
  return (
    <section>
      <div className={styles.profile}>
        <nav className={styles.profile__navigation}>
          <ul className={styles.profile__list}>
            <li>
              <Link
                className={`${styles.profile__link_active} text text_type_main-medium text_color_active`}
                to="/profile"
              >
                Профиль
              </Link>
            </li>
            <div className="p-3"></div>
            <li>
              <Link
                className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
                to="/profile/orders"
              >
                История заказов
              </Link>
            </li>
            <div className="p-3"></div>
            <li
              onClick={logoutUser}
              className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </li>
          </ul>
          <p
            className={`${styles.profile__text} ml-10 mt-30 text text_type_main-default text_color_inactive`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <Switch>
          <Route path="/profile" exact>
            <form onSubmit={submitData} className={styles.profile__form}>
              <Input
                onChange={onChange}
                type={"text"}
                name={"userName"}
                placeholder={"Имя"}
                value={loginData.userName}
                icon={"EditIcon"}
              />
              <div className="p-3"></div>
              <EmailInput
                onChange={onChange}
                name={"email"}
                value={loginData.email}
                icon={"EditIcon"}
              />
              <div className="p-3"></div>
              <PasswordInput
                onChange={onChange}
                name={"password"}
                value={loginData.password}
                icon={"EditIcon"}
                type="text"
              />
              {(loginData.userName !== userData.name) ||
                (loginData.email !== userData.email) ||
              (loginData.password !== "") ? (
                <div className={styles.profile__submitBox}>
                  <p
                    className={`${styles.profile__submitBoxText} text text_type_main-default`}
                    onClick={reverse}
                  >
                    Отмена
                  </p>
                  <Button htmlType="submit" type="primary" size="medium">
                    Изменить
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </form>
          </Route>
          <Route path="/profile/orders">
            <div></div>
          </Route>
        </Switch>
      </div>
    </section>
  );
};
