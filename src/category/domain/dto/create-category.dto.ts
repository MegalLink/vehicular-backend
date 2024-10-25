import { IsString, MinLength, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    minLength: 4,
    example: 'Electronics',
  })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({
    description: 'The title of the category',
    example: 'Electronic Devices',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The URL of the category image',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;
}
