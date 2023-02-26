import {
  Injectable,
  ConsoleLogger,
  ConsoleLoggerOptions,
} from '@nestjs/common';

import { FileLoggerService } from 'services/file-logger/file-logger.service';

import { LogLevel, LogLevelConst } from './constants/log-levels';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private logLevel: LogLevel;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    private readonly fileLogger: FileLoggerService,
  ) {
    super(context, options);

    this.logLevel = (process.env.LOG_LEVEL as LogLevel) ?? LogLevelConst.ERROR;
  }

  log(message: string) {
    super.log(message);
  }
  error(message: string) {
    super.error(message);
  }
  warn(message: string) {
    super.warn(message);
  }
  debug(message: string) {
    super.debug(message);
  }
}
