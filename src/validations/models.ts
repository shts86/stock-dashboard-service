import joi from 'joi';
// import { idSchema } from './common';

export const stockSchemaCode = joi.string().required().min(1);
export const newStockSchema = joi
  .object({
    code: joi.string().required().min(1),
    name: joi.string().required().min(1),
  })
  .required();
