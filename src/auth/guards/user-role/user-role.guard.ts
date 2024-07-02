import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protect.decorator';
import { ResponseUserDbDto } from 'src/auth/domain/dto/response-user-db.dto';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this._reflector.get(
      META_ROLES,
      ctx.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const user: ResponseUserDbDto = req.user;

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
    throw new ForbiddenException(
      `El usuario ${user.userName} no esta autorizado a usar este endpoint`,
    );
  }
}
