import { IsMongoId, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelTypeDto {
  @ApiProperty({
    description: 'The name of the model type',
    minLength: 1,
    example: 'TypeName',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'The ID of the model',
    minLength: 1,
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @MinLength(1)
  modelId: string;
}
