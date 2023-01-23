/* cSpell:disable */
import React, { SyntheticEvent } from "react";
import styles from "./profile.module.css";
import { NavLink, useHistory, Route, Switch } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logout, updateUserData } from "../../services/reducers/authorization";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { OrdersFeed } from "../../components/OdersFeed/OdersFeed";
import { BASE_WSS } from "../../utils/data";
import { useEffect } from "react";
import {
  wsConnection,
  wsOffline,
} from "../../services/reducers/webSocketRedusers";
import { getCookie } from "../../utils/cookie";
import { useAppSelector, AppDispatch } from "../../services/store";

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { userData } = useAppSelector((state) => state.authorizationReducer);
  const { orders } = useAppSelector((state) => state.webSocketReducers);
  const [loginData, setLoginData] = React.useState({
    userName: userData?.name,
    email: userData?.email,
    password: "",
  });

  useEffect(() => {
    dispatch(wsConnection(`${BASE_WSS}?token=${getCookie("accessToken")}`));
    return () => {
      dispatch(wsOffline());
    };
  }, []);
  const logoutUser = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(
      logout({
        token: refreshToken,
      })
    );
    history.push("/Stellar-Burgers/login");
  };
  const onChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const submitData = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUserData({
        email: loginData.email,
        name: loginData.userName,
        password: loginData.password,
      })
    );
  };

  const reverse = () => {
    setLoginData({
      userName: userData?.name,
      email: userData?.email,
      password: "",
    });
  };
  if (userData) {
    return (
      <section>
        <div className={styles.profile}>
          <nav className={styles.profile__navigation}>
            <ul className={styles.profile__list}>
              <li>
                <NavLink
                  className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
                  activeClassName={styles.profile__link_active}
                  to="/Stellar-Burgers/profile/"
                >
                  Профиль
                </NavLink>
              </li>
              <div className="p-3"></div>
              <li>
                <NavLink
                  className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
                  activeClassName={styles.profile__link_active}
                  to="/Stellar-Burgers/profile/orders"
                >
                  История заказов
                </NavLink>
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
            <Route exact path="/Stellar-Burgers/profile">
              <form onSubmit={submitData} className={styles.profile__form}>
                <Input
                  onChange={onChange}
                  type={"text"}
                  name={"userName"}
                  placeholder={"Имя"}
                  value={loginData.userName!}
                  icon={"EditIcon"}
                />
                <div className="p-3"></div>
                <EmailInput
                  onChange={onChange}
                  name={"email"}
                  value={loginData.email!}
                />
                <div className="p-3"></div>
                <PasswordInput
                  onChange={onChange}
                  name={"password"}
                  value={loginData.password}
                />
                {loginData.userName !== userData.name ||
                loginData.email !== userData.email ||
                loginData.password !== "" ? (
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
            <Route  path="/Stellar-Burgers/profile/orders" >
              {orders ? (
                <div className="ml-10">
                  <OrdersFeed />
                </div>
              ) : (
                <Loader />
              )}
            </Route>
          </Switch>
        </div>
      </section>
    );
  } else return <Loader />;
};
