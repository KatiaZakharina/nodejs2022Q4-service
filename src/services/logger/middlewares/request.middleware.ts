import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from 'services/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;
    const start = Date.now();

    await next();

    const responseTime = Date.now() - start;
    const { statusCode } = res;

    const logMessage = `${method} ${originalUrl} ${JSON.stringify({
      query,
      body,
    })} ${statusCode} ${responseTime}ms`;

    if (statusCode >= 500) {
      this.logger.error(logMessage);
    } else if (statusCode >= 400) {
      this.logger.warn(logMessage);
    } else {
      this.logger.log(logMessage);
    }
  }
}
