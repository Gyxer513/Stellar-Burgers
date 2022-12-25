import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrderInfo = createAsyncThunk(
  "getOrderInfo",
  async (orderNumber) => {
    return api.getOrderInfo(orderNumber).catch((error) => {
      console.warn(error);
    });
  }
);

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
    },
  },
  extraReducers: {
    [getOrderInfo.pending]: (state) => {
      state.orderDataStatus = false;
    },
    [getOrderInfo.fulfilled]: (state, action) => {
      state.orderDataStatus = true;
      state.orderData = action.payload;
    },
    [getOrderInfo.rejected]: (state, action) => {
      state.orderDataError = action.payload;
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
