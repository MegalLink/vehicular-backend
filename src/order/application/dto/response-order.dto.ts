import { ApiProperty } from '@nestjs/swagger';

export class ResponseOrderDto {
  @ApiProperty({
    description: 'Unique identifier of the order',
    example: 'ORDER12345',
  })
  orderID: string;

  @ApiProperty({
    description: 'Unique identifier of the user associated with the order',
    example: 'USER12345',
  })
  userID: string;

  @ApiProperty({
    description: 'Details of the user who placed the order',
    example: {
      firstName: 'John',
      lastName: 'Doe',
      identityDocumentNumber: '123456789',
      identityDocumentType: 'Passport',
      address: '123 Main St',
      postalCode: '12345',
      city: 'Metropolis',
      province: 'Central Province',
      phone: '+1234567890',
    },
  })
  userDetail: {
    firstName: string;
    lastName: string;
    identityDocumentNumber: string;
    identityDocumentType: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    phone: string;
  };

  @ApiProperty({
    description: 'Total price of the order',
    example: 150.75,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'Status of the payment',
    example: 'Paid',
  })
  paymentStatus: string;
  @ApiProperty({
    description: 'Unique identifier of the payment',
    example: 'PAYMENT12345',
  })
  paymentID: string;

  @ApiProperty({
    description: 'List of items in the order',
    example: [
      {
        code: 'ITEM123',
        name: 'Brake Pad',
        price: 75.5,
        description: 'High quality brake pad for cars',
        quantity: 2,
      },
    ],
    isArray: true,
  })
  items: {
    code: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];

  @ApiProperty({
    description: 'Date when the order was created',
    example: '2024-10-21T14:30:00Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the order was last updated',
    example: '2024-10-22T09:00:00Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
