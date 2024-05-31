import { Expose } from 'class-transformer';

export class ResponseSparePartDto {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}
