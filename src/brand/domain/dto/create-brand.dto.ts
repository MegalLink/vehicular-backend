import { IsString, MinLength, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({
    description: 'The name of the brand',
    minLength: 1,
    example: 'BrandName',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'The URL of the brand image',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsUrl()
  image: string;
}
