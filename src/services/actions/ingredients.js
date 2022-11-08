import {api} from "../../utils/Api";
import { randomId } from "../../utils/data";

export const GET_INGREDIENTS_DATA = "GET_INGREDIENTS_DATA";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const SELECT_INGREDIENT = "SELECT_INGREDIENT";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";


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
export const selectIngredient = (ingredient) => ({
  type: SELECT_INGREDIENT,
  payload: ingredient,
});

export const addIngredient = (addedIngredients) => {
  const newArray = addedIngredients.map((ingredientObject) => {
    return Object.assign(  {randomId: randomId()}, ingredientObject);
  });
  return { type: ADD_INGREDIENT, payload: newArray };
};

export const addBun = (addedBun) => {
  const newBan = Object.assign(  {randomId: randomId()}, addedBun);
  return { type: ADD_BUN, payload: newBan };
}