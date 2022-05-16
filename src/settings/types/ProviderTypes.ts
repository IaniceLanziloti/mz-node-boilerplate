const PROVIDER_TYPES = {
  DatabaseConnectionStringProvider: Symbol.for(
    'DatabaseConnectionStringProvider'
  ),
  QueueProvider: Symbol.for('QueueProvider'),
  StorageProvider: Symbol.for('StorageProvider'),
};

export { PROVIDER_TYPES };
