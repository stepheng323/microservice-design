import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { connect, Connection, Channel, ConsumeMessage } from 'amqplib';

@Injectable()
export abstract class BaseRabbitMQListener implements OnModuleInit, OnModuleDestroy {
  protected connection: Connection | undefined;
  protected channel: Channel | undefined;

  protected abstract queueName:string
  protected abstract exchangeName: string
  protected abstract routingKey: string;
  protected abstract handleMessage(content: unknown): void;

  async onModuleInit() {
    this.connection = await connect(process.env?.['RABBITMQ_URL'] as string);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchangeName, 'topic', {
      durable: true
    });

    await this.channel.assertQueue(this.queueName, { durable: false });
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
    await this.channel.consume(this.queueName, (msg: ConsumeMessage | null) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        Logger.log(`Received message on ${this.queueName}:`, content);
        this.handleMessage(content);
        if(this.channel)
          this.channel.ack(msg);
      }
    });
    Logger.log(
      `Service is listening on queue "${this.queueName}" for messages with routing key "${this.routingKey}"`,
    );
  }

  async onModuleDestroy() {
    if (this.channel)
    await this.channel.close();
    if (this.connection)
    await this.connection.close();
  }
}
