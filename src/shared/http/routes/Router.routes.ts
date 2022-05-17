import { ROUTER_TYPES } from '@settings/types';
import { inject, injectable } from 'inversify';

import { ErrorMiddleware, NotFoundMiddleware } from '../middlewares';
import { IRouter, IServer } from '../server/interfaces';

@injectable()
class Router implements IRouter {
  constructor(
    @inject(ROUTER_TYPES.NotFoundMiddleware)
    private notFoundMiddleware: NotFoundMiddleware,

    @inject(ROUTER_TYPES.ErrorMiddleware)
    private errorMiddleware: ErrorMiddleware
  ) {
    //
  }

  public async register(server: IServer) {
    this.notFoundMiddleware.register(server);
    /* The ErrorMiddleware must by the last route */
    this.errorMiddleware.register(server);
  }
}

export { Router };
