import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

export enum ValidRoles {
  admin = 'admin',
  employee = 'employee',
  user = 'user',
}

export const RoleProtect = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
