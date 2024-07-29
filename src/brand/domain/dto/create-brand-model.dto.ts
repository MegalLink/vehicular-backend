import { IsString, MinLength } from 'class-validator';
export class CreateBrandModelDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  brandName: string;
}
