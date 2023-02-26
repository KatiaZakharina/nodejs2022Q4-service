import { Injectable } from '@nestjs/common';

@Injectable()
export class FileLoggerService {
  hello() {
    console.log('Hello from FileLoggerService');
  }
}
