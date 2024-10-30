import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class StripePaymentDto {
  @ApiProperty({
    description:
      'Unique identifier of the order for which the payment is being made',
    example: 'ORDER12345',
  })
  @IsNotEmpty({ message: 'El campo orderID no puede estar vacío' })
  @IsString({ message: 'El campo orderID debe ser una cadena de texto' })
  orderID: string;

  @ApiProperty({
    description: 'URL to redirect to after a successful payment',
    example: 'https://example.com/payment/success',
  })
  @IsNotEmpty({ message: 'El campo successURL no puede estar vacío' })
  @IsUrl({}, { message: 'El campo successURL debe ser una URL válida' })
  successURL: string;

  @ApiProperty({
    description: 'URL to redirect to if the payment is canceled',
    example: 'https://example.com/payment/cancel',
  })
  @IsNotEmpty({ message: 'El campo cancelURL no puede estar vacío' })
  @IsUrl({}, { message: 'El campo cancelURL debe ser una URL válida' })
  cancelURL: string;

  @ApiProperty({
    description: 'Amount of tax included in the payment',
    example: 15.75,
  })
  @IsNumber({}, { message: 'El campo tax debe ser un número' })
  @Min(0.001, { message: 'El campo tax debe ser mayor que 0' })
  @Max(1, { message: 'El campo tax no puede ser mayor a 1' })
  tax: number;
}
