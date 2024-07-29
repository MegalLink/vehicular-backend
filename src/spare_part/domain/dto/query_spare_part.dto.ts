import { IsOptional, IsPositive, IsString } from 'class-validator';

export class QuerySparePartDto {
  @IsOptional()
  category: string;
  @IsOptional()
  @IsPositive()
  minStock: number;
  @IsOptional()
  @IsPositive()
  maxStock: number;
  @IsOptional()
  @IsPositive()
  minPrice: number;
  @IsOptional()
  @IsPositive()
  maxPrice: number;
  @IsOptional()
  brand: string;
  @IsOptional()
  brandModel: string;
  @IsOptional()
  modelType: string;
  @IsOptional()
  modelTypeYear: string;
  @IsOptional()
  @IsString()
  search?: string;
}
