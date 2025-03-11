// Coincide con el DTO de entrada CreateOrderDto
export interface ICreateOrderItem {
  code: string;
  quantity: number;
}

export interface ICreateOrder {
  orderID: string;
  userDetailID: string;
  items: ICreateOrderItem[];
}
