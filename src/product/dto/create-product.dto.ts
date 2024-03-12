import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  description: string;
  @IsPositive()
  @Min(0)
  price: number;
  //TODO: add validation here or in front it depends
  images: string[];
  @IsString()
  @MinLength(1)
  category: string;
  @IsInt()
  @IsPositive()
  @Min(0)
  stock: number;
}
