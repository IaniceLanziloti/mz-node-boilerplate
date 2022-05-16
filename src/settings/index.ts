const {
  APP_NAME,
  APP_SLUG,
  APP_NODE_ENV,
  APP_LOG_LEVEL,
  APP_PORT,
  SERVER_TYPE,

  SECRET_PROVIDER,
  STORAGE_PROVIDER,
  QUEUE_PROVIDER,

  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATA_LIMIT,

  AWS_SECRET_MANAGER_REGION,
  AWS_SECRET_MANAGER_ID,

  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
} = process.env;

process.settings = {
  app: {
    name: APP_NAME,
    slug: APP_SLUG,
    nodeEnv: APP_NODE_ENV,
    serverType: SERVER_TYPE || 'express',
    logLevel: APP_LOG_LEVEL,
    port: APP_PORT,
  },
  db: {
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    dataLimit: +(POSTGRES_DATA_LIMIT || 1),
  },
  providers: {
    secret: SECRET_PROVIDER || 'env',
    storage: STORAGE_PROVIDER || 'disk',
    queue: QUEUE_PROVIDER,
  },
  aws: {
    secretManager: {
      region: AWS_SECRET_MANAGER_REGION,
      secretName: AWS_SECRET_MANAGER_ID,
    },
    s3: {
      region: AWS_S3_REGION,
      bucket: AWS_S3_BUCKET_NAME,
    },
  },
};
