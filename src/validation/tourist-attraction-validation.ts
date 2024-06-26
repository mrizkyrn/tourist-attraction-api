import { z, ZodType } from 'zod';

export class TouristAttractionValidation {
   static readonly CREATE: ZodType = z.object({
      thumbnail: z.any(),
      name: z.string().min(3).max(100),
      description: z.string().min(10),
      category: z.string().min(3).max(100),
      tags: z.preprocess(
         (val) => (val as string).split(',').map((tag) => tag.trim()),
         z.array(z.string()).min(1).max(10)
      ),
      entrance_fee: z.preprocess((val) => parseFloat(val as string), z.number().min(0)),
      address: z.string().min(10),
      city: z.string().min(3).max(100),
      province: z.string().min(3).max(100),
      country: z.string().min(3).max(100),
      postal_code: z.string().min(3).max(10),
      latitude: z.preprocess((val) => (val ? parseFloat(val as string) : undefined), z.number().optional()),
      longitude: z.preprocess((val) => (val ? parseFloat(val as string) : undefined), z.number().optional()),
   });

   static readonly SEARCH: ZodType = z.object({
      name: z.string().min(3).max(100).optional(),
      category: z.string().min(3).max(100).optional(),
      city: z.string().min(3).max(100).optional(),
      province: z.string().min(3).max(100).optional(),
      country: z.string().min(3).max(100).optional(),
      tags: z.array(z.string()).min(1).max(10).optional(),
      sort: z.string().min(3).max(100).optional(),
      order: z.string().min(3).max(100).optional(),
      page: z.number().min(1).positive(),
      limit: z.number().min(1).max(100).positive(),
   });
}
