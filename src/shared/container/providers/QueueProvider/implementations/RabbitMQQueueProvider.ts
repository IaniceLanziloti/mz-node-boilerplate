import amqplib, { Connection, Channel } from 'amqplib';
import { injectable } from 'inversify';

import IPublishDTO from '../dtos/IPublishDTO';
import IQueueProvider from '../interfaces/IQueueProvider';

@injectable()
export default class RabbitMQQueueProvider implements IQueueProvider {
  private connection: Connection;

  private channel: Channel;

  private async prepare(): Promise<void> {
    const { vhost, host, username, password, timeout } = process.settings.queue;

    const connectionString = `amqp://${username}:${password}@${host}/${vhost}?socket_timeout=${timeout}`;

    this.connection = await amqplib.connect(connectionString);
    this.channel = await this.connection.createChannel();
  }

  private async gracefulClose(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }

  async publish({ message, queueName }: IPublishDTO): Promise<boolean> {
    await this.prepare();

    await this.channel.assertQueue(queueName, { durable: true });

    const buffer = Buffer.from(JSON.stringify(message));

    const response = this.channel.sendToQueue(queueName, buffer, {
      persistent: true,
    });

    await this.gracefulClose();

    return response;
  }
}
