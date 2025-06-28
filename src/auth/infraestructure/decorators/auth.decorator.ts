import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtect, ValidRoles } from './role-protect.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiForbiddenResponse,
  ApiResponse,
} from '@nestjs/swagger';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    ApiOperation({
      summary: `Requiere autenticación ${roles.length ? `con alguno de estos roles: ${roles.join(', ')}` : ''}`,
    }),
    ApiForbiddenResponse({
      description: 'No tienes permisos para acceder a este recurso',
    }),
    ApiResponse({
      status: 401,
      description: 'No autorizado - Token inválido o expirado',
    }),
    RoleProtect(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
