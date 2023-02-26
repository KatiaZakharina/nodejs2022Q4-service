import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomLoggerService } from './services/logger/logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(error: Error | HttpException) {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      error instanceof HttpException
        ? `${error.message}`
        : `Unexpected: ${error}`;

    this.logger.error(`Error: ${message}`, error.stack);

    return {
      status,
      message: error.message,
    };
  }
}
