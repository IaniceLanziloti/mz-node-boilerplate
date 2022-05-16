import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

export default providers[process.settings.providers.storage]
