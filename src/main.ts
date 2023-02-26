import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import 'dotenv/config';

import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

import { CustomLoggerService } from 'services/logger/logger.service';

import { AppModule } from './app.module';
import { CustomExceptionFilter } from 'exception-filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<string>('port');

  const logger = app.get(CustomLoggerService);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  process.on('unhandledRejection', (error) => {
    logger.error(
      '[Unhandled Rejection]',
      (error as any)?.message || 'Something went wrong',
    );
  });

  process.on('uncaughtException', (error) => {
    logger.error('[Uncaught Exception]', error.message);
  });

  const documentPath = join(dirname(__dirname), 'doc', 'api.yaml');
  const document = parse(await readFile(documentPath, 'utf-8'));

  SwaggerModule.setup('doc', app, document);

  await app.listen(port).then(() => {
    logger.log(`Server running on port ${port}`);
  });
}
bootstrap();
