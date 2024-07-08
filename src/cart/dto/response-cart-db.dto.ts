export class ResponseCartDbDto {
  _id: string;
  userID: string;
  userDetailID: string;
  totalPrice: number;
  items: {
    sparePartID: string;
    quantity: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
