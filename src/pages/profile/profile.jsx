/* cSpell:disable */
import styles from "./profile.module.css";
import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
  return (
    <section className={styles.profile}>
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
              to="/"
            >
              История заказов
            </Link>
          </li>
          <div className="p-3"></div>
          <li
            className={`${styles.profile__link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </li>
        </ul>
      </nav>
      <form className={styles.profile__form}>
        <Input type={"text"}
          name={"userName"}
          placeholder={"Имя"}
          value={"/"}
          />
        <div className="p-3"></div>
        <EmailInput />
        <div className="p-3"></div>
        <PasswordInput />
      </form>
    </section>
  );
};
