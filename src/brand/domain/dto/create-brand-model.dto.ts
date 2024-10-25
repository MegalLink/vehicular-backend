import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandModelDto {
  @ApiProperty({
    description: 'The name of the brand model',
    minLength: 1,
    example: 'ModelName',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'The name of the brand',
    minLength: 1,
    example: 'BrandName',
  })
  @IsString()
  @MinLength(1)
  brandName: string;
}
