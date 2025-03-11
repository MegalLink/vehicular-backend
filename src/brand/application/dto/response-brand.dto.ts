import { ApiProperty } from '@nestjs/swagger';

export class ResponseBrandDto {
  @ApiProperty({
    description: 'The unique identifier of the brand',
    example: '60d0fe4f5311236168a109ca',
  })
  _id: string;

  @ApiProperty({
    description: 'The name of the brand',
    example: 'BrandName',
  })
  name: string;

  @ApiProperty({
    description: 'The URL of the brand image',
    example: 'https://example.com/image.jpg',
  })
  image: string;
}
