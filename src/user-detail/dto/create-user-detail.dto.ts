import { IsString } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  identityDocumentNumber: string;
  @IsString()
  identityDocumentType: string;
  @IsString()
  address: string;
  @IsString()
  postalCode: string;
  @IsString()
  city: string;
  @IsString()
  province: string;
  @IsString()
  phone: string;
}
