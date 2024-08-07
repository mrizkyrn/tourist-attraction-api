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
import { Prisma, User } from '@prisma/client';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';

export class TouristAttractionService {
   static async create(user: User, request: CreateTouristAttractionRequest): Promise<TouristAttractionResponse> {
      // Check if the user have already created a tourist attraction
      const existingTouristAttraction = await prismaClient.touristAttraction.findFirst({
         where: { username: user.username },
      });

      if (existingTouristAttraction) {
         throw new ResponseError(400, 'User already has a tourist attraction');
      }

      // Validate the request body
      const createRequest = Validation.validate(TouristAttractionValidation.CREATE, request);

      // Create the tourist attraction record
      const record = {
         ...createRequest,
         username: user.username,
      };

      try {
         // Create the tourist attraction
         const touristAttraction = await prismaClient.touristAttraction.create({
            data: record,
         });

         // Return the tourist attraction response
         return toTouristAttractionDetailResponse(touristAttraction);
      } catch (error) {
         throw new ResponseError(400, 'Error creating tourist attraction');
      }
   }

   static async search(queryParams: TouristAttractionsQueryParams): Promise<Pageable<TouristAttractionResponse>> {
      // Retrieve the query parameters
      const searchRequest = Validation.validate(TouristAttractionValidation.SEARCH, queryParams);

      // Calculate the skip value
      const skip = (searchRequest.page - 1) * searchRequest.limit;

      // Define the filter options
      const filter: Prisma.TouristAttractionWhereInput = {
         status: 'APPROVED', // Filter only approved tourist attractions
         name: searchRequest.name ? { contains: searchRequest.name, mode: 'insensitive' } : undefined,
         category: searchRequest.category ? { contains: searchRequest.category, mode: 'insensitive' } : undefined,
         city: searchRequest.city ? { contains: searchRequest.city, mode: 'insensitive' } : undefined,
         province: searchRequest.province ? { contains: searchRequest.province, mode: 'insensitive' } : undefined,
         tags: searchRequest.tags ? { hasSome: searchRequest.tags } : undefined,
      };

      // Retrieve the tourist attractions
      const [touristAttractions, total] = await prismaClient.$transaction([
         prismaClient.touristAttraction.findMany({
            where: filter,
            orderBy: {
               [searchRequest.sort || 'id']: searchRequest.order || 'asc',
            },
            skip,
            take: searchRequest.limit,
         }),
         prismaClient.touristAttraction.count({
            where: filter,
         }),
      ]);

      // Return the tourist attraction responses
      return {
         data: touristAttractions.map(toTouristAttractionResponse),
         pagination: {
            total: touristAttractions.length,
            current_page: searchRequest.page,
            total_pages: Math.ceil(total / searchRequest.limit),
            limit: searchRequest.limit,
         },
      };
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

   static async getByUsername(username: string): Promise<TouristAttractionResponse> {
      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findFirst({
         where: { username },
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

   static async update(
      user: User,
      id: number,
      request: CreateTouristAttractionRequest
   ): Promise<TouristAttractionResponse> {
      // Validate the request body
      const updateRequest = Validation.validate(TouristAttractionValidation.CREATE, request);

      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findUnique({
         where: { id },
      });

      // Check if the tourist attraction exists
      if (!touristAttraction) {
         throw new ResponseError(404, 'Tourist attraction not found');
      }

      // Check if the user is the owner of the tourist attraction
      if (touristAttraction.username !== user.username) {
         throw new ResponseError(403, 'Forbidden');
      }

      // Update the tourist attraction record
      const record = {
         ...updateRequest,
      };

      // Update the tourist attraction
      const updatedTouristAttraction = await prismaClient.touristAttraction.update({
         where: { id },
         data: record,
      });

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(updatedTouristAttraction);
   }

   static async delete(user: User, id: number): Promise<TouristAttractionResponse> {
      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findUnique({
         where: { id },
      });

      // Check if the tourist attraction exists
      if (!touristAttraction) {
         throw new ResponseError(404, 'Tourist attraction not found');
      }

      // Check if the user is the owner of the tourist attraction
      if (touristAttraction.username !== user.username) {
         throw new ResponseError(403, 'Forbidden');
      }

      // Delete the tourist attraction
      await prismaClient.touristAttraction.delete({
         where: { id },
      });

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(touristAttraction);
   }

   static async approve(id: number): Promise<TouristAttractionResponse> {
      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findUnique({
         where: { id },
      });

      // Check if the tourist attraction exists
      if (!touristAttraction) {
         throw new ResponseError(404, 'Tourist attraction not found');
      }

      // Update the tourist attraction status
      const updatedTouristAttraction = await prismaClient.touristAttraction.update({
         where: { id },
         data: {
            status: 'APPROVED',
         },
      });

      // Insert the approval record
      await prismaClient.attractionApproval.create({
         data: {
           attraction_id: touristAttraction.id,
           username: touristAttraction.username,
           status: 'APPROVED',
         },
      });
      
      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(updatedTouristAttraction);
   }

   static async reject(id: number): Promise<TouristAttractionResponse> {
      // Retrieve the tourist attraction
      const touristAttraction = await prismaClient.touristAttraction.findUnique({
         where: { id },
      });

      // Check if the tourist attraction exists
      if (!touristAttraction) {
         throw new ResponseError(404, 'Tourist attraction not found');
      }

      // Update the tourist attraction status
      const updatedTouristAttraction = await prismaClient.touristAttraction.update({
         where: { id },
         data: {
            status: 'REJECTED',
         },
      });

      // Insert the rejection record
      await prismaClient.attractionApproval.create({
         data: {
           attraction_id: touristAttraction.id,
           username: touristAttraction.username,
           status: 'REJECTED',
         },
      });

      // Return the tourist attraction response
      return toTouristAttractionDetailResponse(updatedTouristAttraction);
   }
}
