import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsString,
} from 'class-validator';
import { ValidRoles } from '../../decorators/role-protect.decorator';

export class ResponseUserDto {
  @IsArray({ message: 'Los roles deben ser un array' })
  @ArrayNotEmpty({ message: 'El array de roles no puede estar vacío' })
  @IsString({ each: true, message: 'Cada rol debe ser una cadena de texto' })
  @IsIn([Object.values(ValidRoles)], {
    each: true,
    message: `Cada rol debe ser uno de los siguientes valores: ${Object.values(ValidRoles)}`,
  })
  roles: string[];

  @IsBoolean({ message: 'El valor de isActive debe ser booleano' })
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(ResponseUserDto) {}
