import { IsEmail, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  readonly displayName: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
