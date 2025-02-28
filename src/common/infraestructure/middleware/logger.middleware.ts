import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, body, query, params } = req;
    const start = Date.now();
    this.logger.log(`Incoming Request: ${method} ${originalUrl}`);
    this.logger.log(`Request Body: ${JSON.stringify(body)}`);
    this.logger.log(`Query Params: ${JSON.stringify(query)}`);
    this.logger.log(`Route Params: ${JSON.stringify(params)}`);
    const originalSend = res.send;

    res.send = (body) => {
      // Log the outgoing response
      const duration = Date.now() - start;
      this.logger.log(`Outgoing Response: ${res.statusCode} - ${duration}ms`);
      this.logger.log(`Response Body: ${body}`);

      // Call the original `send` method with the captured body
      res.send = originalSend;
      return res.send(body);
    };

    next();
  }
}
