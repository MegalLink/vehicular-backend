import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { ResponseUserDbDto } from '../domain/dto/response-user-db.dto';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): ResponseUserDbDto => {
    const req = ctx.switchToHttp().getRequest();
    const user: ResponseUserDbDto = req.user;

    if (!user) throw new InternalServerErrorException('User not found');

    return user;
  },
);
