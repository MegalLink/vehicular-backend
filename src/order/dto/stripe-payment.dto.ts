import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class StripePaymentDto {
  @ApiProperty({
    description:
      'Unique identifier of the order for which the payment is being made',
    example: 'ORDER12345',
  })
  @IsNotEmpty()
  @IsString()
  orderID: string;

  @ApiProperty({
    description: 'URL to redirect to after a successful payment',
    example: 'https://example.com/payment/success',
  })
  @IsNotEmpty()
  @IsUrl()
  successURL: string;

  @ApiProperty({
    description: 'URL to redirect to if the payment is canceled',
    example: 'https://example.com/payment/cancel',
  })
  @IsNotEmpty()
  @IsUrl()
  cancelURL: string;

  @ApiProperty({
    description: 'Amount of tax included in the payment',
    example: 15.75,
  })
  @IsNumber()
  tax: number;
}
