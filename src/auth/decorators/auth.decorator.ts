import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtect, ValidRoles } from './role-protect.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    ApiBearerAuth(),
    RoleProtect(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
