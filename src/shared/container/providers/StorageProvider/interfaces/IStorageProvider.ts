interface IStorageProvider {
  saveFile(
    originalFilename: string,
    destinationPath?: string,
    destinationFilename?: string
  ): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

export { IStorageProvider };
