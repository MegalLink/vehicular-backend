import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsString,
} from 'class-validator';
import { ValidRoles } from '../../decorators/role-protect.decorator';

const validRolesUpdate = Object.values(ValidRoles).filter(
  (role) => role !== ValidRoles.admin,
);

export class UpdateUserRequestDto {
  @IsArray({ message: 'Los roles deben ser un array' })
  @ArrayNotEmpty({ message: 'El array de roles no puede estar vacío' })
  @IsString({ each: true, message: 'Cada rol debe ser una cadena de texto' })
  @IsIn(validRolesUpdate, {
    each: true,
    message: `Cada rol debe ser uno de los siguientes valores: ${validRolesUpdate}`,
  })
  roles: string[];

  @IsBoolean({ message: 'El valor de isActive debe ser booleano' })
  isActive: boolean;
}

export class UpdateUserDto extends PartialType(UpdateUserRequestDto) {}
