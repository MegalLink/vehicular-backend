export class CreateOrderDBDto {
  orderID: string;
  userID: string;
  userDetailID: string;
  totalPrice: number;
  items: {
    code: string;
    name: string;
    price: string;
    description: string;
    quantity: number;
  }[];
}
