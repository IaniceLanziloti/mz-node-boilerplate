import { DiskStorageProvider, S3StorageProvider } from './implementations';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

const StorageProvider = providers[process.settings.providers.storage];

export { StorageProvider };
