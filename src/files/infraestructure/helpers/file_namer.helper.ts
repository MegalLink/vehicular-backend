import { v4 as uuid } from 'uuid';

export const fileNamer = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: string) => void,
) => {
  if (!file) return callback(new Error('El archivo esta vacio'), '');

  const fileExtension = file.mimetype.split('/')[1];

  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
