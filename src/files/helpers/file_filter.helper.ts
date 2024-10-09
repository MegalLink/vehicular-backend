import { ImageFileExtensionEnum } from './ImageFileExtensionEnum';

export const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) return callback(new Error('El archivo esta vacio'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const allowedImageExtensions: string[] = Object.values(
    ImageFileExtensionEnum,
  );

  if (allowedImageExtensions.includes(fileExtension)) {
    callback(null, true);
  }

  callback(null, false);
};
