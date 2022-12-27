/* cSpell:disable */
import { createSlice } from "@reduxjs/toolkit";



export const webSocketReducers = createSlice({
  name: 'webSocketReducers',
  initialState: {
    wsOpen: null,
    wsClose: null,
    wsConnectionStatus: true,
    wsError: null,
    fetchError: null,
    fetchRequest: false,
    orders: null,
    wsData: null,
  },
  reducers: {
    wsOpen: (state, action) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    wsClose: (state, action) => {
      state.wsClose = action.payload;
      state.wsError = null;
    },
    wsConnection: (state) => {
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
  extraReducers: {
    
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
