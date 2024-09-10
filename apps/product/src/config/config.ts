import { envSchema } from './schema';
import { Logger } from '@nestjs/common';
import * as process from 'node:process';

export const config = () => {
  const parsedConfig = envSchema.safeParse(process.env)

  if (!parsedConfig.success) {
    Logger.log('Invalid environment variables:', parsedConfig.error.format())
    throw new Error('Invalid environment variables');
  }
  return parsedConfig.data


}
