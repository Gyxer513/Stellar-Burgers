import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients";
import orderReducer from "./reducers/order";
import authorizationReducer from "./reducers/authorization";
import { socketMiddleware } from "./middelwares/socketMiddleware";
import  webSocketReducers  from "./reducers/webSocketRedusers"

const wsActions = {
  wsConnection: 'webSocketReducers/wsConnection',
  wsOffline: 'webSocketReducers/wsOffline',
  wsOpen: 'webSocketReducers/wsOpen',
  wsClose: 'webSocketReducers/wsClose,',
  wsError: 'webSocketReducers/wsConnectionError',
  wsMessage: 'webSocketReducers/wsGetOrders',
}

const store = new configureStore({
  reducer: {
    orderReducer,
    ingredientsReducer,
    authorizationReducer,
    webSocketReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export default store;
