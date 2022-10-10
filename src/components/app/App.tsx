import React from "react";
import logo from "./logo.svg";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import AppIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <AppIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
