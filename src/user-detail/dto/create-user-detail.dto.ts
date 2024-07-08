import { IsString } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  fullName: string;
  @IsString()
  identityDocumentNumber: string;
  @IsString()
  identityDocumentType: string;
  @IsString()
  address: string;
  @IsString()
  email: string;
  @IsString()
  postCode: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  phone: string;
}
