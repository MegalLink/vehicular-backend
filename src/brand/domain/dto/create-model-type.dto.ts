import { IsString, MinLength } from 'class-validator';
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
    description: 'The name of the model',
    minLength: 1,
    example: 'ModelName',
  })
  @IsString()
  @MinLength(1)
  modelName: string;
}
