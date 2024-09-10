import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    quantity: z.number().min(1),
    productImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })

export type CreateProductDto = z.infer<typeof createProductSchema>;
