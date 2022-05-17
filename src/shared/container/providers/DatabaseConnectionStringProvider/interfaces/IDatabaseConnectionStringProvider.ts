import { IGetConnectionDTO } from '../dtos/IGetConnectionDTO';

interface IDatabaseConnectionStringProvider {
  getConnectionString(params: IGetConnectionDTO): Promise<string>;
}

export { IDatabaseConnectionStringProvider };
