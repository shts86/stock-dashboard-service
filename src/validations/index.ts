import joi from 'joi';

export * from './common';
export * from './models';

export function getOrThrow<T>(value: any, schema: joi.Schema): T {
  const { error, value: v } = schema.validate(value);
  if (error) throw error;

  return v;
}
