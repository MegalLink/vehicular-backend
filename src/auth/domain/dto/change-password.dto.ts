import {
  IsEmail,
  IsLowercase,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsEmail({}, { message: 'El campo email debe ser un email valido' })
  @IsString({ message: 'El campo email debe ser una cadena de texto' })
  @IsLowercase({ message: 'El campo email debe estar en minúsculas' })
  email: string;

  @IsString({ message: 'El campo newPassword debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'El campo newPassword debe tener al menos 6 caracteres',
  })
  @MaxLength(50, {
    message: 'El campo newPassword debe tener como máximo 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'El campo newPassworde debe tener al menos una letra mayúscula, una letra minúscula y un número',
  })
  newPassword: string;

  @IsString({ message: 'El campo password debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'El campo password debe tener al menos 6 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña actual debe tener como máximo 50 caracteres',
  })
  password: string;
}
