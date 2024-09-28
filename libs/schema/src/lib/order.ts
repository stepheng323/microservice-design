import { z } from 'zod';

export const CreateOrderSchema = z
  .object({
    productId: z.string(),
    userId: z.string(),
    quantity: z.number().min(1),
    amount: z.number().min(1),
  })

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
