import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

const allowedStatuses = Object.values(OrderStatus).join(', ');

export class UpdateOrderDto {
  @IsEnum(OrderStatus, {
    message: `El status debe ser uno de los valores permitidos: ${allowedStatuses}`,
  })
  status: OrderStatus;
}
