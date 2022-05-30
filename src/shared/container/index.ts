import { DatabaseConnection } from '@shared/database';
import { ErrorMiddleware, NotFoundMiddleware } from '@shared/http/middlewares';
import { IRouter } from '@shared/http/server/interfaces';
import { Container } from 'inversify';

import {
  APPLICATION_BASE,
  APPLICATION_PROVIDERS,
  APPLICATION_ROUTES,
} from './identifiers';
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
  .bind<DatabaseConnection>(APPLICATION_BASE.DatabaseConnection)
  .to(DatabaseConnection);

container
  .bind<IRouter>(APPLICATION_ROUTES.NotFoundMiddleware)
  .to(NotFoundMiddleware);
container.bind<IRouter>(APPLICATION_ROUTES.ErrorMiddleware).to(ErrorMiddleware);

container
  .bind<IDatabaseStringProvider>(APPLICATION_PROVIDERS.DatabaseStringProvider)
  .to(DatabaseStringProvider);
container
  .bind<IStorageProvider>(APPLICATION_PROVIDERS.StorageProvider)
  .to(StorageProvider);
container
  .bind<IQueueProvider>(APPLICATION_PROVIDERS.QueueProvider)
  .to(QueueProvider);

export { container };
