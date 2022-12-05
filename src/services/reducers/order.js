import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendOrder = createAsyncThunk("sendOrder", async (list) => {
  const res = api.sendData(list);
  return res;
});

export const orderReducer = createSlice({
  name: "reducerOrder",
  initialState: {
    orderDetails: null,
    orderRequest: false,
    orderFailed: false,
  },
  reducers: { 
    deleteOrderData: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: {
    [sendOrder.pending]: (state) => {
      state.orderRequest = true;
    },
    [sendOrder.fulfilled]: (state, action) => {
      state.orderDetails = action.payload.order?.number;
      state.orderRequest = false;
    },
    [sendOrder.rejected]: (state) => {
      state.orderFailed = true;
    },
  },
})

export const { deleteOrderData } = orderReducer.actions;
export default orderReducer.reducer;