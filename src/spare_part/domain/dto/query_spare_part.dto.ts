import { IsOptional, IsPositive } from 'class-validator';

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
  partModel: string;
  @IsOptional()
  year: string;
}
