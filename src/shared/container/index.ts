import { DatabaseConnection } from '@shared/database';
import { ErrorMiddleware, NotFoundMiddleware } from '@shared/http/middlewares';
import { IRouter } from '@shared/http/server/interfaces';
import { Container } from 'inversify';
import { CONNECTION_TYPES, PROVIDER_TYPES, ROUTER_TYPES } from 'settings/types';

import {
  QueueProvider,
  StorageProvider,
  DatabaseStringProvider,
} from './providers';
import { IDatabaseStringProvider } from './providers/DatabaseStringProvider/interfaces';
import { IQueueProvider } from './providers/QueueProvider/interfaces';
import { IStorageProvider } from './providers/StorageProvider/interfaces';

const container = new Container();

container
  .bind<DatabaseConnection>(CONNECTION_TYPES.DatabaseConnection)
  .to(DatabaseConnection);

container.bind<IRouter>(ROUTER_TYPES.NotFoundMiddleware).to(NotFoundMiddleware);
container.bind<IRouter>(ROUTER_TYPES.ErrorMiddleware).to(ErrorMiddleware);

container
  .bind<IDatabaseStringProvider>(PROVIDER_TYPES.DatabaseStringProvider)
  .to(DatabaseStringProvider);
container
  .bind<IStorageProvider>(PROVIDER_TYPES.StorageProvider)
  .to(StorageProvider);
container.bind<IQueueProvider>(PROVIDER_TYPES.QueueProvider).to(QueueProvider);

export { container };
