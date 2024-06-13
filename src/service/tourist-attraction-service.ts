import {
   CreateTouristAttractionRequest,
   TouristAttractionResponse,
   toTouristAttractionDetailResponse,
} from '../model/tourist-attraction-model';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';
import { TouristAttractionValidation } from '../validation/tourist-attraction-validation';
import { User } from '@prisma/client';

export class TouristAttractionService {
   static async create(user: User, request: CreateTouristAttractionRequest): Promise<TouristAttractionResponse> {
      // Validate the request body
      const createRequest = Validation.validate(TouristAttractionValidation.CREATE, request);

      // Create the tourist attraction record
      const record = {
         ...createRequest,
         user_id: user.id,
         rating: 0,
         status: 'PENDING',
      };

      // Create the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.create({
         data: record,
      });

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(touristAttraction);
   }
}
