/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendOrder = createAsyncThunk("sendOrder", async (list) => 
   api.sendData(list)
);

export const fullOrderInfo = createAsyncThunk(
  "fullOrderInfo",
  async (orderNumber) => 
   api.getFullOrderInfo(orderNumber)
  
);



export const orderReducer = createSlice({
  name: "reducerOrder",
  initialState: {
    orderDetails: null,
    orderRequest: false,
    orderFailed: false,
    orderData: null,
  },
  reducers: {
    deleteOrderData: (state) => {
      state.orderDetails = null;
    },
    deleteFullOrderData: (state) => {
      state.orderDetails = null;
    },
  },

  extraReducers: {
    [sendOrder.pending]: (state) => {
      state.orderRequest = true;
    },
    [sendOrder.fulfilled]: (state, action) => {
      state.orderDetails = action.payload.order?.number;
      state.orderRequest = false;
    },
    [sendOrder.rejected]: (state, action) => {
      state.orderFailed = true;
      console.warn(action.error);
    },

    [fullOrderInfo.pending]: (state) => {
      state.orderDataStatus = false;
    },
    [fullOrderInfo.fulfilled]: (state, action) => {
      state.orderDataStatus = true;
      state.orderData = action.payload;
    },
    [fullOrderInfo.rejected]: (state, action) => {
      state.orderDataStatus = false;
      console.warn(action.error);
    },
  },
});

export const { deleteOrderData, deleteFullOrderData } = orderReducer.actions;
export default orderReducer.reducer;
