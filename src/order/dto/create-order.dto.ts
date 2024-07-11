import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class Item {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userDetailID: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'El array de items no puede estar vacío' })
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}
