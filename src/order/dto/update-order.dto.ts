import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

const allowedStatuses = Object.values(OrderStatus).join(', ');

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `El status debe ser uno de los valores permitidos: ${allowedStatuses}`,
  })
  status?: OrderStatus;

  @IsOptional()
  paymentStatus?: string;
}
