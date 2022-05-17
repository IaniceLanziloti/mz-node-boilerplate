import { IGetConnectionDTO } from '@shared/container/providers/DatabaseStringProvider/dtos';
import { IDatabaseStringProvider } from '@shared/container/providers/DatabaseStringProvider/interfaces';
import { inject, injectable } from 'inversify';
import { PROVIDER_TYPES } from 'settings/types';
import { DataSource } from 'typeorm';

@injectable()
class DatabaseConnection {
  constructor(
    @inject(PROVIDER_TYPES.DatabaseStringProvider)
    private DatabaseStringProvider: IDatabaseStringProvider
  ) {
    //
  }

  public async getConnection({
    companyId = '',
  }: IGetConnectionDTO): Promise<DataSource> {
    const url = await this.DatabaseStringProvider.getConnectionString({
      companyId,
    });

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

export { DatabaseConnection };
