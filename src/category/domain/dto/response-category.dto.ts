import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategoryDto {
  @ApiProperty({
    description: 'The unique identifier of the category',
    example: '64fae1e3eac25b0016b7c123',
  })
  _id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    description: 'The title of the category',
    example: 'Electronic Devices',
  })
  title: string;

  @ApiProperty({
    description: 'The URL of the category image',
    example: 'https://example.com/image.jpg',
  })
  image: string;
}
