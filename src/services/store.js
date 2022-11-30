import { rootReducer } from "./reducers/index";
import { configureStore } from '@reduxjs/toolkit';
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ingredientsReducer from "./reducers/ingredients"

const store = new configureStore({
  reducer: {
    ingredientsReducer,
  },
});

export default store;
