/* cSpell:disable; */
import { Iingredient } from "./ingredients";

export interface IModalProps {
  onClose: () => void;
  children: React.ReactElement | React.ReactNode;
}
export interface IOrderCard {
  createdAt: string;
  orderIngredients: string[];
  name: string;
  number: number;
  status: string;
}

export interface IModalOverlay {
  onClick: () => void;
}

export interface IOrderFullInfo {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderNumber {
  orderNumber: string;
}

export interface IChoousenIngredients extends Iingredient {
  randomId: string;
}

export interface IConstructorItem {
  data: IChoousenIngredients;
  id: string;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface ILocationState {
  from: {
    pathname: string;
  };
  background?: any;
}

export interface IUrlParamsType {
  id: string;
}
