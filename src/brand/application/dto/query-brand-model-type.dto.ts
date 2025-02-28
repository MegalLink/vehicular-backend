import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryBrandoModelTypeDto {
  @ApiProperty({
    description: 'The ID of the model',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  modelId?: string;

  @ApiProperty({
    description: 'The name of the model',
    example: 'Model name',
  })
  @IsOptional()
  modelName?: string;
}
