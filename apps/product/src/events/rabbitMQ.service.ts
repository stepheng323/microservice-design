import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { connect, Connection, Channel, ConsumeMessage } from 'amqplib';

@Injectable()
export abstract class BaseRabbitMQListener implements OnModuleInit, OnModuleDestroy {
  protected connection: Connection;
  protected channel: Channel;
  protected queueName = 'product_queue';
  protected exchangeName = 'order_exchange';

  protected abstract routingKey: string;
  protected abstract handleMessage(content: unknown): void;

  async onModuleInit() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(this.queueName, { durable: false });
    await this.channel.bindQueue(this.queueName, this.exchangeName, this.routingKey);
    await this.channel.consume(this.queueName, (msg: ConsumeMessage | null) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        Logger.log(`Received message on ${this.queueName}:`, content);
        this.handleMessage(content);
        this.channel.ack(msg);
      }
    });
    Logger.log(
      `Service is listening on queue "${this.queueName}" for messages with routing key "${this.routingKey}"`,
    );
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
