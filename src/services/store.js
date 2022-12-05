import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from "./reducers/ingredients"
import orderReducer from './reducers/order';

const store = new configureStore({
  reducer: {
    orderReducer,
    ingredientsReducer,
    
  },
});

export default store;
