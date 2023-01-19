/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IorderStore } from "../types/store";

export const sendOrder = createAsyncThunk("sendOrder", async (list: []) => 
   api.sendData(list)
);

export const fullOrderInfo = createAsyncThunk(
  "fullOrderInfo",
  async (orderNumber: number) => 
   api.getFullOrderInfo(orderNumber)
  
);
const initialState: IorderStore = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
  orderData: null,
  orderDataStatus: false,
}


export const orderReducer = createSlice({
  name: "reducerOrder",
  initialState,
  reducers: {
    deleteOrderData: (state) => {
      state.orderDetails = null;
    },
    deleteFullOrderData: (state) => {
      state.orderDetails = null;
    },
  },

  extraReducers: (builder) =>{
    builder.addCase(sendOrder.pending, (state) => {
      state.orderRequest = true;
    }),
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.orderDetails = action.payload.order?.number;
      state.orderRequest = false;
    }),
    builder.addCase(sendOrder.rejected, (state, action) => {
      state.orderFailed = true;
      console.warn(action.error);
    }),

    builder.addCase(fullOrderInfo.pending, (state) => {
      state.orderDataStatus = false;
    }),
    builder.addCase(fullOrderInfo.fulfilled, (state, action) => {
      state.orderDataStatus = true;
      state.orderData = action.payload;
    }),
    builder.addCase(fullOrderInfo.rejected, (state, action) => {
      state.orderDataStatus = false;
      console.warn(action.error);
    })
  },
});

export const { deleteOrderData, deleteFullOrderData } = orderReducer.actions;
export default orderReducer.reducer;
