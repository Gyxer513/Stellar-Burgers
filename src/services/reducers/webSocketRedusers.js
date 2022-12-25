import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getFullOrderInfo = createAsyncThunk(
  "getFullOrderInfo",
  async (orderNumber) => {
    return api.getFullOrderInfo(orderNumber).catch((error) => {
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
    wsData: null,
    orderDataStatus: false,
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
    [getFullOrderInfo.pending]: (state) => {
      state.orderDataStatus = false;
    },
    [getFullOrderInfo.fulfilled]: (state, action) => {
      state.orderDataStatus = true;
      state.orderData = action.payload;
    },
    [getFullOrderInfo.rejected]: (state, action) => {
      state.orderDataStatus = false;
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
