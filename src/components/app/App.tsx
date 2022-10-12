import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeder";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { link } from "../../utils/data"

function App() {
  const [state, setState] = useState({ api: [], isLoading: false });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    return fetch(link)
      .then((response) => {
        return response.ok
          ? response.json()
          : setState({ ...state, isLoading: false });
      })
      .then((data) => {
        setState({ api: data.data, isLoading: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.api} />
        <BurgerConstructor data={state.api} />
      </main>
    </>
  );
}

export default App;
