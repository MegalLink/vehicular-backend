import * as joi from 'joi';

export const EnvValidationSchema = joi.object({
  MONGODB: joi.required(),
  PORT: joi.number().default(3000),
});
