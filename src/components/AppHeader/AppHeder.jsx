/* cSpell:disable; */
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";


const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__constructor}`}>
        <div className="m-2">
          <BurgerIcon type="primary" />
        </div>
        <div className="p-3">
          <NavLink
            to="/"
            className={`${styles.header__link} text text_type_main-default text_color_inactive `}
            activeClassName={styles.header__link_active}
          >
              Конструктор
          </NavLink>
        </div>
        <div className="m-2">
          <ListIcon type="secondary" />
        </div>
        <div className="p-3">
          <NavLink
            exact 
            to="/feed"
            className={`${styles.header__link} text text_type_main-default text_color_inactive `}
            activeClassName={styles.header__link_active}
          >
            Лента заказов
          </NavLink>
        </div>
      </div>
      <Logo />
      <div className="p-10"></div>
      <div className={`${styles.header__cabinet}`}>
        <div className="m-2">
          <ProfileIcon type="secondary" />
        </div>
        <div className="p-3">
          <NavLink
            exact
            to="/profile"
            className={`${styles.header__link} text text_type_main-default text_color_inactive`}
            activeClassName={styles.header__link_active}
          >
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
