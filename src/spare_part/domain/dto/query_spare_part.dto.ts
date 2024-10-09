import { IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySparePartDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Category of the spare part',
    example: '',
  })
  category: string;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ description: 'Minimum stock level', example: '' })
  minStock: number;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({ description: 'Maximum stock level', example: '' })
  maxStock: number;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'Minimum price of the spare part',
    example: '',
  })
  minPrice: number;

  @IsOptional()
  @IsPositive()
  @ApiPropertyOptional({
    description: 'Maximum price of the spare part',
    example: '',
  })
  maxPrice: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Brand of the spare part', example: '' })
  brand: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Model of the brand', example: '' })
  brandModel: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Type of model', example: '' })
  modelType: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Year of the model', example: '' })
  modelTypeYear: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Search query', example: '' })
  search?: string;
}
