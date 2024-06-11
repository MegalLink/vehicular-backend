import { IsString, MinLength, IsUrl, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;
}
