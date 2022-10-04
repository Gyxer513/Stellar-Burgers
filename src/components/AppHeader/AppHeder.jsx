import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

class AppHeader extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={`${styles.header__constructor}`}>
          <div className="m-2">
            <BurgerIcon type="primary" />
          </div>
          <div className="p-3">
            <a className="text text_type_main-default">Конструктор</a>
          </div>
          <div className="m-2">
            <ListIcon type="secondary" />
          </div>
          <div className="p-3">
            <a className="text text_type_main-default text_color_inactive">
              Лента заказов
            </a>
          </div>
        </div>
        <div className="p-5"></div>
        <div className="p-5"></div>
        <div className="p-5"></div>
        <div className="p-5"></div>
        <Logo />
        <div className="p-5"></div>
        <div className="p-5"></div>
        <div className="p-5"></div>
        <div className="p-5"></div>
        <div className={`${styles.header__cabinet}`}>
          <div className="m-2">
            <ProfileIcon type="secondary" />
          </div>
          <div className="p-3">
            <a className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default AppHeader;
