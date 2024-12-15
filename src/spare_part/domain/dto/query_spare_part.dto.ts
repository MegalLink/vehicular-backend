import { IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

  @IsOptional()
  @ApiPropertyOptional({ 
    description: 'Number of items to skip',
    example: 0,
    default: 0 
  })
  offset?: number = 0;

  @IsOptional()
  @ApiPropertyOptional({ 
    description: 'Number of items to return',
    example: 20,
    default: 20 
  })
  limit?: number = 20;
}
