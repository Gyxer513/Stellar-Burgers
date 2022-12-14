import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from "./reducers/ingredients"
import orderReducer from './reducers/order';
import authorizationReducer from './reducers/authorization';

const store = new configureStore({
  reducer: {
    orderReducer,
    ingredientsReducer,
    authorizationReducer,
  },
});

export default store;
