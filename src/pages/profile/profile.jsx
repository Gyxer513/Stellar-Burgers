/* cSpell:disable */
import React from "react";
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

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.authorizationReducer);
  const { orders } = useSelector((state) => state.webSocketReducers);
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
    history.push("/login");
  };
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const submitData = (e) => {
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
      userName: userData.name,
      email: userData.email,
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
                  to="/profile/"
                >
                  ??????????????
                </NavLink>
              </li>
              <div className="p-3"></div>
              <li>
                <NavLink
                  className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
                  activeClassName={styles.profile__link_active}
                  to="/profile/orders"
                >
                  ?????????????? ??????????????
                </NavLink>
              </li>
              <div className="p-3"></div>
              <li
                onClick={logoutUser}
                className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
              >
                ??????????
              </li>
            </ul>
            <p
              className={`${styles.profile__text} ml-10 mt-30 text text_type_main-default text_color_inactive`}
            >
              ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
            </p>
          </nav>
          <Switch>
            <Route path="/profile" exact>
              <form onSubmit={submitData} className={styles.profile__form}>
                <Input
                  onChange={onChange}
                  type={"text"}
                  name={"userName"}
                  placeholder={"??????"}
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
                {loginData.userName !== userData.name ||
                loginData.email !== userData.email ||
                loginData.password !== "" ? (
                  <div className={styles.profile__submitBox}>
                    <p
                      className={`${styles.profile__submitBoxText} text text_type_main-default`}
                      onClick={reverse}
                    >
                      ????????????
                    </p>
                    <Button htmlType="submit" type="primary" size="medium">
                      ????????????????
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </Route>
            <Route path="/profile/orders/" exact>
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
