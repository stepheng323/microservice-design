import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export abstract class RabbitmqBasePublisherService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | undefined;
  private channel: Channel | undefined;

  protected abstract exchange: string
  protected abstract emit(payload: unknown): void;

  async onModuleInit() {
    this.connection = await connect(process.env?.['RABBITMQ_URL'] as string);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'topic', {
      durable: true
    });
  }

  protected publishEvent(eventType: string, payload: unknown) {
    if (this.channel) {
      this.channel.publish(this.exchange, eventType, Buffer.from(JSON.stringify(payload)), {
        persistent: true
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
