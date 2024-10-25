import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty({
    description: 'Code of the item',
    example: 'ITEM123',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Quantity of the item',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Unique identifier of the user detail',
    example: 'USER12345',
  })
  @IsNotEmpty()
  @IsString()
  userDetailID: string;

  @ApiProperty({
    description: 'List of items to order',
    type: [Item],
    example: [
      {
        code: 'ITEM123',
        quantity: 5,
      },
      {
        code: 'ITEM456',
        quantity: 3,
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'El array de items no puede estar vacío' })
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
