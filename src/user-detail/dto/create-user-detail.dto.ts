import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDetailDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsString()
  @IsNotEmpty({ message: "El campo 'firstName' no puede estar vacío" })
  firstName: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  @IsNotEmpty({ message: "El campo 'lastName' no puede estar vacío" })
  lastName: string;

  @ApiProperty({
    description: 'Número del documento de identidad',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty({
    message: "El campo 'identityDocumentNumber' no puede estar vacío",
  })
  identityDocumentNumber: string;

  @ApiProperty({
    description: 'Tipo de documento de identidad',
    example: 'DNI',
  })
  @IsString()
  @IsNotEmpty({
    message: "El campo 'identityDocumentType' no puede estar vacío",
  })
  identityDocumentType: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123',
  })
  @IsString()
  @IsNotEmpty({ message: "El campo 'address' no puede estar vacío" })
  address: string;

  @ApiProperty({ description: 'Código postal', example: '08001' })
  @IsString()
  @IsNotEmpty({ message: "El campo 'postalCode' no puede estar vacío" })
  postalCode: string;

  @ApiProperty({ description: 'Ciudad de residencia', example: 'Barcelona' })
  @IsString()
  @IsNotEmpty({ message: "El campo 'city' no puede estar vacío" })
  city: string;

  @ApiProperty({ description: 'Provincia de residencia', example: 'Cataluña' })
  @IsString()
  @IsNotEmpty({ message: "El campo 'province' no puede estar vacío" })
  province: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+34 600 123 456',
  })
  @IsString()
  @IsNotEmpty({ message: "El campo 'phone' no puede estar vacío" })
  phone: string;
}
