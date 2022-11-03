import { api } from "../../utils/Api";

export const SEND_ORDER_DATA = "GET_INGREDIENTS_DATA";
export const SEND_ORDER_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const SEND_ORDER_ERROR = "GET_INGREDIENTS_ERROR";

export function sendData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_DATA,
    });
    api
      .sendData()
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
