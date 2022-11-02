import {api} from "../../utils/Api";

export const GET_INGREDIENTS_DATA = "GET_INGREDIENTS_DATA";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_DATA,
    });

    api
      .getData()
      .then((ingredients) => {
        if (ingredients) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredients.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
          payload: console.log(error),
        });
      });
  };
}
