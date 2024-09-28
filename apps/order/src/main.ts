import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { OrderModule } from './app/order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  const globalPrefix = 'order';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
