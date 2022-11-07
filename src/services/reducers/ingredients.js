import {
  GET_INGREDIENTS_DATA,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  ADD_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  chosenIngredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};
export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_DATA: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          ingredientsRequest: false,
          ingredients: action.payload,
        };
      }
      case GET_INGREDIENTS_ERROR: {
        return {
          ...state,
          ingredientsRequest: false,
          ingredientsFailed: true,
        };
      }
      case ADD_INGREDIENT: {
        return {
          ...state,
          chosenIngredients: action.payload
        };
      }
      default: {
        return state
    }
  }
};
