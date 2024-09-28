import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string(),
    profileImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const loginSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })

export type LoginDto = z.infer<typeof loginSchema>;

