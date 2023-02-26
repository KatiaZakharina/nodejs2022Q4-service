import { Injectable } from '@nestjs/common';

import { CustomLoggerService } from './services/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly customLogService: CustomLoggerService) {}

  testCustomLogService(): string {
    this.customLogService.log('Testing CustomLogService...');
    return 'CustomLogService test complete.';
  }
}
