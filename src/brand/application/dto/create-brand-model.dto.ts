import { IsMongoId, IsString, MinLength } from 'class-validator';
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
    description: 'The ID of the brand',
    minLength: 1,
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @MinLength(1)
  brandId: string;
}
