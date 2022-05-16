import RabbitMQQueueProvider from './implementations/RabbitMQQueueProvider';

const providers = {
  rabbitmq: RabbitMQQueueProvider,
};

export default providers[process.settings.providers.queue];
