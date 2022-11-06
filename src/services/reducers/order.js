import {
  SEND_ORDER_DATA,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
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
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: action.payload,
      };
    }
    case SEND_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
