export class CreateOrderDto {
  userID: string;
  userDetailID: string;
  items: {
    code: string;
    quantity: number;
  }[];
}
