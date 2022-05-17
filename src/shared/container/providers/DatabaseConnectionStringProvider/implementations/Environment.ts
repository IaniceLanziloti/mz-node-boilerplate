import { injectable } from 'inversify';

import { IGetConnectionDTO } from '../dtos/IGetConnectionDTO';
import { IDatabaseConnectionStringProvider } from '../interfaces/IDatabaseConnectionStringProvider';

@injectable()
class Environment implements IDatabaseConnectionStringProvider {
  async getConnectionString(_: IGetConnectionDTO): Promise<string> {
    const { host, port, database, username, password } = process.settings.db;

    return `postgresql://${username}:${password}@${host}:${port}/${database}`;
  }
}

export { Environment };
