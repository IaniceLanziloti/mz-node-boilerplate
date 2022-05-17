import { AWSSecretManager } from './implementations/AWSSecretManager';
import { Environment } from './implementations/Environment';

const providers = {
  aws: AWSSecretManager,
  env: Environment,
};

const DatabaseConnectionStringProvider =
  providers[process.settings.providers.secret];

export { DatabaseConnectionStringProvider };
