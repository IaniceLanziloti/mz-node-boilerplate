import DatabaseConnection from '@shared/database';
import { ErrorMiddleware } from '@shared/http/middlewares/ErrorMiddleware';
import { NotFoundMiddleware } from '@shared/http/middlewares/NotFoundMiddleware';
import { IRouter } from '@shared/http/server/interfaces/IRouter';
import { Container } from 'inversify';
import { CONNECTION_TYPES, PROVIDER_TYPES, ROUTER_TYPES } from 'settings/types';

import { QueueProvider, StorageProvider } from './providers';
import DatabaseConnectionStringProvider from './providers/DatabaseConnectionStringProvider';
import { IDatabaseConnectionStringProvider } from './providers/DatabaseConnectionStringProvider/interfaces/IDatabaseConnectionStringProvider';
import IQueueProvider from './providers/QueueProvider/interfaces/IQueueProvider';
import IStorageProvider from './providers/StorageProvider/interfaces/IStorageProvider';

const container = new Container();

container
  .bind<DatabaseConnection>(CONNECTION_TYPES.DatabaseConnection)
  .to(DatabaseConnection);

container.bind<IRouter>(ROUTER_TYPES.NotFoundMiddleware).to(NotFoundMiddleware);
container.bind<IRouter>(ROUTER_TYPES.ErrorMiddleware).to(ErrorMiddleware);

container
  .bind<IDatabaseConnectionStringProvider>(
    PROVIDER_TYPES.DatabaseConnectionStringProvider
  )
  .to(DatabaseConnectionStringProvider);
container
  .bind<IStorageProvider>(PROVIDER_TYPES.StorageProvider)
  .to(StorageProvider);
container.bind<IQueueProvider>(PROVIDER_TYPES.QueueProvider).to(QueueProvider);

export default container;
