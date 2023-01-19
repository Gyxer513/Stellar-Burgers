/* cSpell:disable; */
import { Iingredient } from "./ingredients";

export interface IauthorizationStore {
  isLoading: boolean;
  isAuthorizationSuccess: boolean;
  userData: object | null;
  accessToken: string | null;
  error: string | null;
  resetStatus: boolean | null;
  tokenError: boolean;
}
export interface IingredientsStore {
  ingredients: [Iingredient] | [];
  chosenIngredients: [];
  chosenBun: Iingredient | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export interface IorderStore {
  orderDetails: null | object;
  orderRequest: boolean;
  orderFailed: boolean;
  orderData: null | number;
  orderDataStatus: boolean;
}
