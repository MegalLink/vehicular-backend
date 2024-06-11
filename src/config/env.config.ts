export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
});

export enum EnvironmentConstants {
  environment = 'environment',
  mongodb = 'mongodb',
  port = 'port',
  cloudinary_cloud_name = 'cloudinary_cloud_name',
  cloudinary_api_key = 'cloudinary_api_key',
  cloudinary_api_secret = 'cloudinary_api_secret',
}
