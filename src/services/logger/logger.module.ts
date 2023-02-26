import { Module } from '@nestjs/common';

import { FileLoggerService } from 'services/file-logger/file-logger.service';

import { CustomLoggerService } from './logger.service';

@Module({
  providers: [CustomLoggerService, FileLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
