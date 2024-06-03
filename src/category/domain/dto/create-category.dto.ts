import { IsString, MinLength, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(4)
  name: string;
  @IsString()
  title: string;
  @IsString()
  @IsUrl()
  image: string;
}
