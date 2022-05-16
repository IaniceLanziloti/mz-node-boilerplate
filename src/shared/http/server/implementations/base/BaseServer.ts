import { injectable } from 'inversify';
import container from 'shared/container';
import Router from 'shared/http/routes/Router.routes';

@injectable()
class BaseServer {
  public async registerRoutes(server: any): Promise<void> {
    const router = container.resolve(Router);
    router.register(server);
  }
}

export { BaseServer };
