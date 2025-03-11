import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
    description: 'Date when the order was created',
    example: '2024-10-21T14:30:00Z',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  createdAt?: Date;
}
