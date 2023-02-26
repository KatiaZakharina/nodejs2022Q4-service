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
    const DEFAULT_LOG_LEVEL = LogLevelConst.ERROR;

    super(context, options);

    this.logLevel = (process.env.LOG_LEVEL as LogLevel) ?? DEFAULT_LOG_LEVEL;
  }

  log(message: string) {
    super.log(message);
  }
  error(message: string, trace: string) {
    super.error(message, trace);
  }
  warn(message: string) {
    super.warn(message);
  }
  debug(message: string) {
    super.debug(message);
  }
}
