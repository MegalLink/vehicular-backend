import { IsString, MinLength, IsOptional, IsUrl } from 'class-validator';
export class CreateBrandDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsOptional()
  models: string[];
  @IsString()
  @IsUrl()
  image: string;
}
