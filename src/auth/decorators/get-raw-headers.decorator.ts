import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IncomingHttpHeaders } from 'http';

export const GetRawHeaders = createParamDecorator(
  (_, ctx: ExecutionContext): IncomingHttpHeaders => {
    const req = ctx.switchToHttp().getRequest();

    const headers: IncomingHttpHeaders = req.rawHeaders();

    return headers;
  },
);
