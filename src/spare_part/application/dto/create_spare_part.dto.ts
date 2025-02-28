import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSparePartDto {
  @ApiProperty({
    description: 'Unique code for the spare part',
    example: 'SP001',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  code: string;

  @ApiProperty({
    description: 'Name of the spare part',
    example: 'Brake Pad',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({
    description: 'Description of the spare part',
    example: 'High-quality brake pad for various car models',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the spare part in USD',
    example: 120.99,
    minimum: 0,
  })
  @IsPositive()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Array of image URLs representing the spare part',
    example: ['https://example.com/image1.jpg'],
  })
  @IsOptional()
  images: string[];

  @ApiPropertyOptional({
    description: 'Category of the spare part',
    example: 'Brakes',
  })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Available stock for the spare part',
    example: 50,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiPropertyOptional({
    description: 'Brand of the spare part',
    example: 'BrandX',
  })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiPropertyOptional({
    description: 'Brand model of the spare part',
    example: 'ModelX',
  })
  @IsOptional()
  @IsString()
  brandModel: string;

  @ApiPropertyOptional({
    description: 'Type of the model the spare part is compatible with',
    example: 'Sedan',
  })
  @IsOptional()
  @IsString()
  modelType: string;

  @ApiPropertyOptional({
    description: 'Year of the model type the spare part is compatible with',
    example: '2020',
  })
  @IsOptional()
  @IsString()
  modelTypeYear: string;
}
