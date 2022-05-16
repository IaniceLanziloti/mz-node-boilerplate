/* eslint-disable no-console */
import { injectable } from 'inversify';
import AppError from 'shared/errors/AppError';

import { IServer } from '../server/interfaces';
import { Request, Response, Next } from '../server/types';

@injectable()
export default class ErrorMiddleware {
  private async errorMiddleWare(
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line no-unused-vars
    _: Next
  ): Promise<Response> {
    if (err instanceof AppError) {
      response.statusCode = err.statusCode;
      const errorResponse = {
        error: err.message,
        stackTrace: err.stack,
      };
      return response.send(errorResponse);
    }

    console.log('Sending ERROR...');
    console.log(err);

    response.statusCode = 500;
    const errorResponse = {
      error: err.message,
      stackTrace: err.stack,
    };

    return response.send(errorResponse);
  }

  public register(server: IServer) {
    server.use(this.errorMiddleWare);
  }
}
