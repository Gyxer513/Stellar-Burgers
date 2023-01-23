/* cSpell:disable; */
export interface IModalProps {
  onClose: () => void;
  children: React.ReactElement | React.ReactNode;
}
export interface IOrderCard {
  createdAt: string;
  orderIngredients: [string];
  name: string;
  number: number;
  status: string;
}

export interface IModalOverlay {
  onClick: () => void;
}

export interface IOrderFullInfo {
  createdAt: string;
  ingredients: [string];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderNumber {
  orderNumber: string;
}
