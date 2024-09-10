import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(1),
    productImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })

export type CreateProductDto = z.infer<typeof createProductSchema>;


export const updateProductSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().min(1).optional(),
    productImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
