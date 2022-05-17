import AWSSecretManager from './implementations/AWSSecretManager';
import Environment from './implementations/Environment';

const providers = {
  aws: AWSSecretManager,
  env: Environment,
};

export default providers[process.settings.providers.secret];
