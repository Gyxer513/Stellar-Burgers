/* cSpell:disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWsStore } from "../types/store";

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
    wsClose: (state, action) => {
      state.wsClose = action.payload;
      state.wsError = null;
    },
    wsConnection: (state, action) => {
      state.wsConnectionStatus = true;
    },
    wsOffline: (state) => {
      state.wsConnectionStatus = false;
      state.orders = null;
    },
    wsError: (state, action) => {
      state.wsError = action.payload;
    },
    wsGetOrders: (state, action) => {
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
