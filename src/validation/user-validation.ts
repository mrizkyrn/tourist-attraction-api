import { z, ZodType } from 'zod';

export class UserValidation {
   static readonly REGISTER: ZodType = z.object({
      full_name: z.string().min(3).max(100),
      username: z.string().min(3).max(100).regex(/^[a-zA-Z0-9_]+$/),
      email: z.string().email(),
      password: z.string().min(6).max(100),
      role: z.string().regex(/^(ADMIN|USER)$/).default('USER'),
   });

   static readonly LOGIN: ZodType = z.object({
      username: z.string().min(3).max(100),
      password: z.string().min(6).max(100),
   });
}
