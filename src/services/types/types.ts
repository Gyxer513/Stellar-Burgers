
/* cSpell:disable; */
export interface IModalProps {
    onClose: () => void,
    children: React.ReactElement | React.ReactNode,
  }
export interface IOrderCard {
  orderIngredients: [string], 
  status: string, 
  name: string, 
  number: number, 
  date: number,
}