import {
  IsEmail,
  IsLowercase,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail(
    {},
    { message: 'El campo email debe ser un correo electrónico válido' },
  )
  @IsString({ message: 'El campo email debe ser una cadena de texto' })
  @IsLowercase({ message: 'El correo electrónico debe estar en minúsculas' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
    maxLength: 50,
    example: 'Password123!',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña debe tener como máximo 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número',
  })
  password: string;
}
