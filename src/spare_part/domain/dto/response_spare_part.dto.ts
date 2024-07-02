export class ResponseSparePartDto {
  _id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  brand: string;
  brandModel: string;
  modelType: string;
  modelTypeYear: string;
  userID: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
