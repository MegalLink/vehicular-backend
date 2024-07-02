import { IsString, MinLength, IsUrl } from 'class-validator';
export class CreateBrandModelDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsString()
  @MinLength(1)
  brandName: string;
  @IsString()
  @IsUrl()
  image: string;
}
