import { ApiProperty } from '@nestjs/swagger';

export class ResponseBrandModelDto {
  @ApiProperty({
    description: 'The unique identifier of the brand model',
    example: '60d0fe4f5311236168a109cb',
  })
  _id: string;

  @ApiProperty({
    description: 'The ID of the brand',
    example: '507f1f77bcf86cd799439011',
  })
  brandId: string;

  @ApiProperty({
    description: 'The name of the brand model',
    example: 'ModelName',
  })
  name: string;
}
