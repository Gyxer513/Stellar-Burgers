/* cSpell:disable; */
import { api } from "../../utils/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendOrder = createAsyncThunk("sendOrder", async (list) => {
  return api.sendData(list).catch((error) => {
    console.warn(error);
});
});

/* export const getFullOrderInfo = createAsyncThunk(
  "getFullOrderInfo",
  async (orderNumber) => {
    return api.getFullOrderInfo(orderNumber).catch((error) => {
      console.warn(error);
    });
  }
); */

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
    [sendOrder.rejected]: (state) => {
      state.orderFailed = true;
    },

    
  },
});

export const { deleteOrderData, deleteFullOrderData } = orderReducer.actions;
export default orderReducer.reducer;
