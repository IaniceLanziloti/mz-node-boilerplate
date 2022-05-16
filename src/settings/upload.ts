import { generateUUID } from '@shared/utils/generateUUID';
import foldToAscii from 'fold-to-ascii';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const { s3 } = process.settings.aws;
const driver = process.settings.providers.storage;

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: string;
    aws: {
      bucket: string;
      region: string;
    };
  };
}

export default {
  driver,
  tmpFolder,
  uploadsFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      async filename(request, file, callback) {
        const fileHash = generateUUID();
        const unicodedName = foldToAscii.foldReplacing(file.originalname);
        //
        const fileName = `${fileHash}-${unicodedName}`;
        //
        return callback(null, fileName);
      },
    }),
  },
  config: {
    aws: {
      bucket: s3.bucket,
      region: s3.region,
    },
  },
} as IUploadConfig;
