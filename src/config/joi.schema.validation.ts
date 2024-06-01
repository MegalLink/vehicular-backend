import * as joi from 'joi';

export const EnvValidationSchema = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(3000),
  CLOUDINARY_CLOUD_NAME: joi.required(),
  API_KEY: joi.required(),
  API_SECRET: joi.required(),
});
