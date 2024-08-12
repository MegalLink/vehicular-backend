import * as joi from 'joi';

export const EnvValidationSchema = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(3000),
  CLOUDINARY_CLOUD_NAME: joi.required(),
  CLOUDINARY_API_KEY: joi.required(),
  CLOUDINARY_API_SECRET: joi.required(),
  JWT_SECRET: joi.required(),
  JWT_EXPIRES_IN: joi.required(),
  EMAIL_HOST: joi.required(),
  EMAIL_PORT: joi.required(),
  EMAIL_USER: joi.required(),
  EMAIL_PASS: joi.required(),
  EMAIL_FROM: joi.required(),
  REST_API_URL: joi.required(),
  GOOGLE_CLIENT_ID: joi.required(),
  GOOGLE_CLIENT_SECRET: joi.required(),
  GOOGLE_REDIRECT_URL: joi.required(),
  STRIPE_SECRET_KEY: joi.required(),
  STRIPE_WEBHOOK_SECRET: joi.required(),
});
