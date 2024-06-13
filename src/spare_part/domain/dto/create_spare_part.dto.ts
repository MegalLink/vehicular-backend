import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSparePartDto {
  @IsString()
  @MinLength(1)
  code: string;
  @IsString()
  @MinLength(4)
  name: string;
  @IsString()
  description: string;
  @IsPositive()
  @Min(0)
  price: number;
  @IsOptional()
  images: string[];
  @IsOptional()
  @IsString()
  category: string;
  @IsInt()
  @IsPositive()
  stock: number;
  @IsOptional()
  @IsString()
  brand: string;
  @IsOptional()
  @IsString()
  brandModel: string;
  @IsOptional()
  @IsString()
  modelType: string;
  @IsOptional()
  @IsString()
  modelTypeYear: string;
  @IsOptional()
  @IsString()
  userID: string;
}
