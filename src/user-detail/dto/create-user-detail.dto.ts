import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;

  @IsString()
  @IsNotEmpty({
    message: 'El número de documento de identidad no puede estar vacío',
  })
  identityDocumentNumber: string;

  @IsString()
  @IsNotEmpty({
    message: 'El tipo de documento de identidad no puede estar vacío',
  })
  identityDocumentType: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'El código postal no puede estar vacío' })
  postalCode: string;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'La provincia no puede estar vacía' })
  province: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  phone: string;
}
