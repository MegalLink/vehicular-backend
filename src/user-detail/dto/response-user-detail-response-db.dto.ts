import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDetailDbDto {
  @ApiProperty({
    description: 'ID del usuario en la base de datos',
    example: '60c72b2f9b1e8c1a4a3d9b00',
  })
  _id: string;

  @ApiProperty({ description: 'ID del usuario', example: 'USR123456' })
  userID: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  lastName: string;

  @ApiProperty({
    description: 'Número del documento de identidad',
    example: '1234567890',
  })
  identityDocumentNumber: string;

  @ApiProperty({
    description: 'Tipo de documento de identidad',
    example: 'DNI',
  })
  identityDocumentType: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123',
  })
  address: string;

  @ApiProperty({ description: 'Código postal', example: '08001' })
  postalCode: string;

  @ApiProperty({ description: 'Ciudad de residencia', example: 'Barcelona' })
  city: string;

  @ApiProperty({ description: 'Provincia de residencia', example: 'Cataluña' })
  province: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+34 600 123 456',
  })
  phone: string;
}
