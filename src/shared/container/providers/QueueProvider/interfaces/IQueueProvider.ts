import IPublishDTO from '../dtos/IPublishDTO'

export default interface IQueueProvider {
  publish(params: IPublishDTO): Promise<boolean>
}
