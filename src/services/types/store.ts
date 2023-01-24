/* cSpell:disable; */
import { Iingredient } from "./ingredients";
import { IOrderInfo } from "./ingredients";
import { IChoousenIngredients, IOrderFullInfo } from "./types";
import { IuserData } from "./user";

export interface IauthorizationStore {
  isLoading: boolean;
  isAuthorizationSuccess: boolean;
  userData: IuserData | null;
  accessToken: string | null;
  error: string | null;
  resetStatus: boolean | null;
  tokenError: boolean;
}
export interface IingredientsStore {
  ingredients: Iingredient[];
  chosenIngredients: IChoousenIngredients[];
  chosenBun: Iingredient | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export interface IorderStore {
  orderDetails: null | number;
  orderRequest: boolean;
  orderFailed: boolean;
  orderData: IOrderInfo | null ;
  orderDataStatus: boolean;
}

export interface IWsStore {
  wsOpen: null | string,
  wsClose: null | string,
  wsConnectionStatus: boolean,
  wsError: null | string,
  fetchError: null | string,
  fetchRequest: boolean,
  orders: null | IOrderFullInfo[],
  wsData: null | any,
}