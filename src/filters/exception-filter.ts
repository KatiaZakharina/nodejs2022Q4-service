import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomLoggerService } from '../services/logger/logger.service';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(error: Error | HttpException, host: ArgumentsHost) {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      error instanceof HttpException
        ? `${error.message}`
        : `Unexpected: ${error}`;

    this.logger.error(`Error: ${message}`);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(status).json({
      status,
      message: error.message,
    });
  }
}
