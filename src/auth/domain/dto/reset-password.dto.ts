import { IsEmail, IsLowercase, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsString()
  @IsLowercase()
  email: string;
}
