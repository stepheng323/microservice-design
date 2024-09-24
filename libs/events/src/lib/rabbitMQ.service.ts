import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | undefined;
  private channel: Channel | undefined;
    private exchange = 'order_exchange'

  async onModuleInit() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'topic', {
      durable: true,
    });
  }

  async publishEvent(eventType: string, payload: unknown) {
    if (this.channel) {
      this.channel.publish(this.exchange, eventType, Buffer.from(JSON.stringify(payload)), {
        persistent: true,
      });
    } else {
      console.error('Channel is not defined');
    }
    console.log(`Event "${eventType}" published with payload:`, payload);
  }
  async onModuleDestroy() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
