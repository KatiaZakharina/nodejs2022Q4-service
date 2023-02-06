import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import 'dotenv/config';

import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const documentPath = join(dirname(__dirname), 'doc', 'api.yaml');
  const document = parse(await readFile(documentPath, 'utf-8'));

  SwaggerModule.setup('doc', app, document);

  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
