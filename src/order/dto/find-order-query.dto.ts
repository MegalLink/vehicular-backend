import { IsOptional, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class FindOrderQueryDto {
  @IsOptional()
  @IsString()
  userID: string;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  createdAt?: Date;
}
