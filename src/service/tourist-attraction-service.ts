import {
   CreateTouristAttractionRequest,
   TouristAttractionResponse,
   TouristAttractionsQueryParams,
   toTouristAttractionDetailResponse,
   toTouristAttractionResponse,
} from '../model/tourist-attraction-model';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';
import { TouristAttractionValidation } from '../validation/tourist-attraction-validation';
import { User } from '@prisma/client';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';

export class TouristAttractionService {
   static async create(user: User, request: CreateTouristAttractionRequest): Promise<TouristAttractionResponse> {
      // Validate the request body
      const createRequest = Validation.validate(TouristAttractionValidation.CREATE, request);

      // Create the tourist attraction record
      const record = {
         ...createRequest,
         user_id: user.id,
      };

      // Create the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.create({
         data: record,
      });

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(touristAttraction);
   }

   static async search(queryParams: TouristAttractionsQueryParams): Promise<Pageable<TouristAttractionResponse>> {
      const { name, category, city, province, tags, sort, order, page, limit } = queryParams;

      // Validate the query parameters
      Validation.validate(TouristAttractionValidation.SEARCH, queryParams);

      // Parse the page and limit query parameters
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;

      // Calculate the skip value
      const skip = (pageNumber - 1) * limitNumber;

      // Retrieve the tourist attractions
      const touristAttractions = await prismaClient.touristAttraction.findMany({
         where: {
            // status: 'APPROVED', // Add this line to filter only tourist attractions with status 'APPROVED
            name: name ? { contains: name, mode: 'insensitive' } : undefined,
            category: category ? { contains: category, mode: 'insensitive' } : undefined,
            city: city ? { contains: city, mode: 'insensitive' } : undefined,
            province: province ? { contains: province, mode: 'insensitive' } : undefined,
            tags: tags ? { hasSome: tags } : undefined,
         },
         orderBy: {
            [sort || 'id']: order || 'asc',
         },
         skip,
         take: limitNumber,
      });

      // Return the tourist attraction responses
      return {
         data: touristAttractions.map(toTouristAttractionResponse),
         pagination: {
            total: touristAttractions.length,
            current_page: pageNumber,
            total_pages: Math.ceil(touristAttractions.length / limitNumber),
            limit: limitNumber,
         },
      }
   }

   static async getDetailById(id: number): Promise<TouristAttractionResponse> {
      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findUnique({
         where: { id },
      });
      
      // Check if the tourist attraction exists
      if (!touristAttraction) {
         throw new ResponseError(404, 'Tourist attraction not found');
      }

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(touristAttraction);
   }

   static async getByStatus(status: string): Promise<TouristAttractionResponse[]> {
      // Retrieve the tourist attractions
      const touristAttractions = await prismaClient.touristAttraction.findMany({
         where: {
            status,
         },
      });

      // Return the tourist attraction responses
      return touristAttractions.map(toTouristAttractionResponse);
   }
}
