import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../enum/order.enum';

export class FindOrderQueryDto {
  @ApiPropertyOptional({
    description: 'Unique identifier of the user',
    example: 'USER12345',
  })
  @IsOptional()
  @IsString()
  userID: string;

  @ApiPropertyOptional({
    description: 'Status of the payment',
    example: 'Paid',
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiPropertyOptional({
    description: 'Current status of the order',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Date when the order was created',
    example: '2024-10-21T14:30:00Z',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  createdAt?: Date;
}
