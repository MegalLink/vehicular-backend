import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class StripePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderID: string;
  @IsNotEmpty()
  @IsUrl()
  successURL: string;
  @IsNotEmpty()
  @IsUrl()
  cancelURL: string;
  @IsNumber()
  tax: number;
}
