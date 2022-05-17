import { RabbitMQQueueProvider } from './implementations/RabbitMQQueueProvider';

const providers = {
  rabbitmq: RabbitMQQueueProvider,
};

const QueueProvider = providers[process.settings.providers.queue];

export { QueueProvider };
