import { Expose } from 'class-transformer';

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
  part_model: string;
  year: string;
}
