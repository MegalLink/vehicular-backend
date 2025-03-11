import { ApiProperty } from '@nestjs/swagger';

export class ResponseModelTypeDto {
  @ApiProperty({
    description: 'The unique identifier of the model type',
    example: '60d0fe4f5311236168a109cc',
  })
  _id: string;

  @ApiProperty({
    description: 'The ID of the model',
    example: '507f1f77bcf86cd799439011',
  })
  modelId: string;

  @ApiProperty({
    description: 'The name of the model type',
    example: 'TypeName',
  })
  name: string;
}
