import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { getRabbitMQConfig } from '@nestjs-scaffold/events';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const rabbitMQConfig =  getRabbitMQConfig(configService);

  const uniqueQueueName = 'order-queue';

  app.connectMicroservice<MicroserviceOptions>({
    ...rabbitMQConfig,
    options: {
      ...rabbitMQConfig.options,
      queue: uniqueQueueName,
    },
  } as MicroserviceOptions);

  const globalPrefix = 'order';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
