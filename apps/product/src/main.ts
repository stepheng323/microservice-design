import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@lib/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'product';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new GlobalExceptionFilter)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
