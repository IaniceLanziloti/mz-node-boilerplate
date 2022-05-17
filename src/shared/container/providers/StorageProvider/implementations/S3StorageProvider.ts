import { AppError } from '@shared/errors/AppError';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { uploadConfig } from 'settings/upload';

import { IStorageProvider } from '../interfaces';

const { uploadsFolder, tmpFolder } = uploadConfig;

const { region, bucket } = process.settings.aws.s3;

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region,
    });
  }

  public async saveFile(
    originalFilename: string,
    destinationPath?: string,
    destinationFilename?: string
  ): Promise<string> {
    const originalPath = path.resolve(tmpFolder, originalFilename);
    const fileContent = await fs.promises.readFile(originalPath);
    const ContentType = mime.getType(originalPath);

    const storePath = destinationPath || uploadsFolder;
    const storeFilename = destinationFilename || originalFilename;

    const Key = path.resolve(storePath, storeFilename);

    if (!ContentType) {
      throw new AppError('Conteúdo inválido.');
    }

    await this.client
      .putObject({
        Bucket: bucket,
        Key,
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return Key;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: bucket,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
