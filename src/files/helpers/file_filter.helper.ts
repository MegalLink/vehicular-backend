export const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const allowedExtensions = ['jpeg', 'png', 'jpg'];

  if (allowedExtensions.includes(fileExtension)) {
    callback(null, true);
  }

  callback(null, false);
};
