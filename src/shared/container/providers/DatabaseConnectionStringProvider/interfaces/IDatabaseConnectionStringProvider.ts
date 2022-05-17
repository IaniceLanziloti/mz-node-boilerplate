import IGetConnectionDTO from '../dtos/IGetConnectionDTO';

export interface IDatabaseConnectionStringProvider {
  getConnectionString(params: IGetConnectionDTO): Promise<string>;
}
