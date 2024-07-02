import { IsString, MinLength, IsUrl } from 'class-validator';
export class CreateBrandDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @IsUrl()
  image: string;
}
