import { api } from "../../utils/Api";

export const SEND_ORDER_DATA = "SEND_ORDER_DATA";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";

export function sendData(list) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_DATA,
    });
    api
      .sendData(list)
      .then((data) => {
        if (data) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            payload: data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SEND_ORDER_ERROR,
          payload: console.log(error),
        });
      });
  };
}
