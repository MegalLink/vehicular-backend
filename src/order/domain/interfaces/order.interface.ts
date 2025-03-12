export interface IOrderUserDetail {
  firstName: string;
  lastName: string;
  identityDocumentNumber: string;
  identityDocumentType: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  phone: string;
}

export interface IOrderItem {
  code: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

// Interfaz base que coincide con CreateOrderDBDto
export interface ICreateOrderDB {
  orderID: string;
  userID: string;
  totalPrice: number;
  userDetail: IOrderUserDetail;
  items: IOrderItem[];
}

// Interfaz que coincide con ResponseOrderDbDto
export interface IOrder extends ICreateOrderDB {
  paymentStatus: string;
  paymentID: string;
  createdAt: Date;
  updatedAt: Date;
}
