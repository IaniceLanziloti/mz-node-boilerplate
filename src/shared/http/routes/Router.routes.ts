import { ROUTER_TYPES } from '@settings/types';
import { inject, injectable } from 'inversify';

import ErrorMiddleware from '../middlewares/ErrorMiddleware';
import { IRouter, IServer } from '../server/interfaces';

@injectable()
export default class Router implements IRouter {
  constructor(
    @inject(ROUTER_TYPES.ErrorMiddleware)
    private errorMiddleware: ErrorMiddleware
  ) {
    //
  }

  public async register(server: IServer) {
    /* The ErrorMiddleware must by the last route */
    this.errorMiddleware.register(server);
  }
}