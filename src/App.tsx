import React from 'react';
import logo from './logo.svg';
import styles from './app.module.css';
import AppHeader from './components/AppHeader/AppHeder'
import AppIngredients from './components/BurgerIngredients/AppIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

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
