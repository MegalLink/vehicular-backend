import { IsString, MinLength } from 'class-validator';
export class CreateModelTypeDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  modelName: string;
}
