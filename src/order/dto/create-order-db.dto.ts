export class CreateOrderDBDto {
  orderID: string;
  userID: string;
  totalPrice: number;
  userDetail: {
    firstName: string;
    lastName: string;
    identityDocumentNumber: string;
    identityDocumentType: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    phone: string;
  };
  items: {
    code: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];
}
