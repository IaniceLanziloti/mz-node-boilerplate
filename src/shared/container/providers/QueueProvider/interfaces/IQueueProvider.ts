import { IPublishDTO } from '../dtos/IPublishDTO';

interface IQueueProvider {
  publish(params: IPublishDTO): Promise<boolean>;
}

export { IQueueProvider };
