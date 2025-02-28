import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryBrandoModelDto {
  @ApiProperty({
    description: 'The ID of the brand',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  brandId?: string;

  @ApiProperty({
    description: 'The name of the brand',
    example: 'Brand name',
  })
  @IsOptional()
  brandName?: string;
}
