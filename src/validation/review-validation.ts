import { z, ZodType } from 'zod';

export class ReviewValidation {
   static readonly CREATE: ZodType = z.object({
      attraction_id: z.number().positive(),
      rating: z.number().min(1).max(5),
      comment: z.string().min(3),
   });

   static readonly UPDATE: ZodType = z.object({
      rating: z.number().min(1).max(5).optional(),
      comment: z.string().min(3).optional(),
   });
}