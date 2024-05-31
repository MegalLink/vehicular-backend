import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateSparePartDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  description: string;
  @IsPositive()
  @Min(0)
  price: number;
  images: string[];
  @IsString()
  @MinLength(1)
  category: string;
  @IsInt()
  @IsPositive()
  @Min(0)
  stock: number;
}
