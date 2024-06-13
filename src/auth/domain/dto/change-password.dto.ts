import {
  IsEmail,
  IsLowercase,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsLowercase({ message: 'El correo electrónico debe estar en minúsculas' })
  email: string;

  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
  })
  @MaxLength(50, {
    message: 'La nueva contraseña debe tener como máximo 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La nueva contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número',
  })
  newPassword: string;

  @IsString({ message: 'La contraseña actual debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'La contraseña actual debe tener al menos 6 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña actual debe tener como máximo 50 caracteres',
  })
  password: string;
}
