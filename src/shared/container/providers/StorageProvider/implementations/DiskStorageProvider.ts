import fs from 'fs';
import { injectable } from 'inversify';
import path from 'path';
import uploadConfig from 'settings/upload';

import IStorageProvider from '../interfaces/IStorageProvider';

const { tmpFolder, uploadsFolder } = uploadConfig;

@injectable()
export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(
    originalFilename: string,
    destinationPath?: string,
    destinationFilename?: string
  ): Promise<string> {
    const storePath = path.resolve(uploadsFolder, destinationPath || '');
    const storeFilename = destinationFilename || originalFilename;
    //

    if (!fs.existsSync(storePath)) {
      fs.mkdirSync(storePath, { recursive: true });
    }

    await fs.promises.rename(
      path.resolve(tmpFolder, originalFilename),
      path.resolve(storePath, storeFilename)
    );
    return storeFilename;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadsFolder, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
