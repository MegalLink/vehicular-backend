import { ApiProperty } from '@nestjs/swagger';

export class ResponseBrandModelDto {
  @ApiProperty({
    description: 'The unique identifier of the brand model',
    example: '60d0fe4f5311236168a109cb',
  })
  _id: string;

  @ApiProperty({
    description: 'The name of the brand',
    example: 'BrandName',
  })
  brandName: string;

  @ApiProperty({
    description: 'The name of the brand model',
    example: 'ModelName',
  })
  name: string;
}
