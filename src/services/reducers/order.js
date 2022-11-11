import {
  SEND_ORDER_DATA,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  DELETE_ORDER_DATA,
} from "../actions/order";

const initialState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_DATA: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderDetails: action.payload.order.number,
        orderRequest: false,
        orderFailed: false,
      }
    }
    case SEND_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        orderDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
