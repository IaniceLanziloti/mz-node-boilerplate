import IGetConnectionDTO from '@shared/container/providers/DatabaseConnectionStringProvider/dtos/IGetConnectionDTO';
import { IDatabaseConnectionStringProvider } from '@shared/container/providers/DatabaseConnectionStringProvider/interfaces/IDatabaseConnectionStringProvider';
import { inject, injectable } from 'inversify';
import { PROVIDER_TYPES } from 'settings/types';
import { DataSource } from 'typeorm';

@injectable()
export default class DatabaseConnection {
  constructor(
    @inject(PROVIDER_TYPES.DatabaseConnectionStringProvider)
    private databaseConnectionStringProvider: IDatabaseConnectionStringProvider
  ) {
    //
  }

  public async getConnection({
    companyId = '',
  }: IGetConnectionDTO): Promise<DataSource> {
    const url = await this.databaseConnectionStringProvider.getConnectionString(
      { companyId }
    );

    const ssl =
      process.settings.app.nodeEnv === 'development'
        ? { rejectUnauthorized: false }
        : false;

    const dataSource = new DataSource({
      type: 'postgres',
      url,
      ssl,
      connectTimeoutMS: 9000,
      entities: ['./src/domains/**/infra/orm/entities/*.ts'],
    });

    const connection = await dataSource.initialize();
    return connection;
  }
}
