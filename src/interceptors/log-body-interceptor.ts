import { CustomLoggerService } from 'services/logger/logger.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map } from 'rxjs/operators';

@Injectable()
export class LogBodyInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(_: ExecutionContext, next: CallHandler<any>) {
    const observable = next.handle().pipe(
      map((data) => {
        this.logger.debug(`[Response Body] ${JSON.stringify(data)}\n`);

        return data;
      }),
    );

    return observable;
  }
}
