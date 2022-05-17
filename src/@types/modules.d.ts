/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_SLUG: string;
      APP_LOG_LEVEL: string;
      APP_PORT: number;
      APP_NODE_ENV: 'local' | 'development' | 'production';

      SERVER_TYPE: 'express' | 'restify' | 'fastify';

      SECRET_PROVIDER: 'aws';
      STORAGE_PROVIDER: 'disk' | 's3';
      QUEUE_PROVIDER: 'rabbitmq';

      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_DATABASE: string;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATA_LIMIT: string;

      QUEUE_VHOST: string;
      QUEUE_HOST: string;
      QUEUE_PORT: string;
      QUEUE_USERNAME: string;
      QUEUE_PASSWORD: string;
      QUEUE_TIMEOUT: string;

      AWS_SECRET_MANAGER_REGION: string;
      AWS_SECRET_MANAGER_ID: string;

      AWS_S3_REGION: string;
      AWS_S3_BUCKET_NAME: string;
    }
    interface Process {
      settings: {
        app: {
          name: string;
          slug: string;
          nodeEnv: 'local' | 'development' | 'production';
          serverType: 'express' | 'restify' | 'fastify';
          logLevel: string;
          port: number;
        };
        db: {
          host: string;
          port: number;
          database: string;
          username: string;
          password: string;
          dataLimit: number;
        };
        queue: {
          vhost: string;
          host: string;
          port?: number;
          username: string;
          password: string;
          timeout: number;
        };
        providers: {
          secret: 'env' | 'aws';
          storage: 'disk' | 's3';
          queue: 'rabbitmq';
        };
        aws: {
          secretManager: {
            region: string;
            secretName: string;
          };
          s3: {
            region: string;
            bucket: string;
          };
        };
      };
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
