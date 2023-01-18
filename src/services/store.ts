
/* cSpell:disable; */
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/ingredients";
import orderReducer from "./reducers/order";
import authorizationReducer from "./reducers/authorization";
import { socketMiddleware } from "./middelwares/socketMiddleware";
import  webSocketReducers  from "./reducers/webSocketRedusers"
import {} from ""

const wsActions = {
  wsConnection: 'webSocketReducers/wsConnection',
  wsOffline: 'webSocketReducers/wsOffline',
  wsOpen: 'webSocketReducers/wsOpen',
  wsClose: 'webSocketReducers/wsClose,',
  wsError: 'webSocketReducers/wsConnectionError',
  wsMessage: 'webSocketReducers/wsGetOrders',
}

const store = configureStore({
  reducer: {
    orderReducer,
    ingredientsReducer,
    authorizationReducer,
    webSocketReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
