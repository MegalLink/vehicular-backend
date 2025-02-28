import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

const allowedStatuses = Object.values(OrderStatus).join(', ');

export class UpdateOrderDto {
  @ApiProperty({
    description: `Status of the order. Allowed values: ${allowedStatuses}`,
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `El status debe ser uno de los valores permitidos: ${allowedStatuses}`,
  })
  status?: OrderStatus;

  @ApiProperty({
    description:
      'Status of the payment, such as "Paid", "Pending", or "Failed".',
    example: 'Paid',
    required: false,
  })
  @IsOptional()
  paymentStatus?: string;
}
