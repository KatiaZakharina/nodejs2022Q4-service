import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port).then(() => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
