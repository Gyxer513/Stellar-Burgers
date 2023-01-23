/* cSpell:disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Iingredient } from "../types/ingredients";
import { IWsStore } from "../types/store";
import { IOrderFullInfo } from "../types/types";

const initialState: IWsStore = {
  wsOpen: null,
  wsClose: null,
  wsConnectionStatus: true,
  wsError: null,
  fetchError: null,
  fetchRequest: false,
  orders: null,
  wsData: null,
}

export const webSocketReducers = createSlice({
  name: 'webSocketReducers',
  initialState,
  reducers: {
    wsOpen: (state, action: PayloadAction<string>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    wsClose: (state, action: PayloadAction<string>) => {
      state.wsClose = action.payload;
      state.wsError = null;
    },
    wsConnection: (state, action: PayloadAction<string>) => {
      state.wsConnectionStatus = true;
    },
    wsOffline: (state) => {
      state.wsConnectionStatus = false;
      state.orders = null;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.wsError = action.payload;
    },
    wsGetOrders: (state, action: PayloadAction<{orders: IOrderFullInfo[]}>) => {
      state.orders = action.payload.orders;
      state.wsData = action.payload;
    },
  },
});
export const {
  wsOpen,
  wsClose,
  wsConnection,
  wsOffline,
  wsError,
  wsGetOrders,
} = webSocketReducers.actions;

export default webSocketReducers.reducer;
