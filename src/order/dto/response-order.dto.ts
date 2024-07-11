export class ResponseOrderDto {
  orderID: string;
  userID: string;
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
  totalPrice: number;
  paymentStatus: string;
  status: string;
  items: {
    code: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
