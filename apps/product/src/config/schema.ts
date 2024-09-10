import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).refine(val => !isNaN(val), {
    message: "PORT must be a number",
  }),
  DATABASE_URL: z.string(),
});
