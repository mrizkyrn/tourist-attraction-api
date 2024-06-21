import { CreateFavoriteRequest, FavoriteResponse, toFavoriteResponse } from '../model/favorite-model';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';
import { ResponseError } from '../error/response-error';
import { User } from '@prisma/client';
import { TouristAttractionResponse, toTouristAttractionResponse } from '../model/tourist-attraction-model';

export class FavoriteService {
   static async getByUsername(username: string): Promise<TouristAttractionResponse[]> {
      // Get all tourist attractions details favorited by the user
      const favorites = await prismaClient.favorite.findMany({
         where: {
            username: username,
         },
         include: {
            tourist_attraction: true,
         },
      });

      // Return the tourist attraction responses
      return favorites.map((favorite) => toTouristAttractionResponse(favorite.tourist_attraction));
   }

   static async create(user: User, request: CreateFavoriteRequest): Promise<FavoriteResponse> {
      console.log(user.username, request);
      console.log(user.username, request.attraction_id);
      // Check if the user has already favorited the tourist attraction
      const existingFavorite = await prismaClient.favorite.findFirst({
         where: {
            username: user.username,
            attraction_id: request.attraction_id,
         },
      });
      console.log(existingFavorite);

      if (existingFavorite) {
         throw new ResponseError(400, 'User has already favorited the tourist attraction!');
      }

      // Create the favorite record
      const record = {
         ...request,
         username: user.username,
      };

      console.log(record);

      // Create the favorite
      const favorite = await prismaClient.favorite.create({
         data: record,
      });

      // Return the favorite response
      return toFavoriteResponse(favorite);
   }

   static async delete(user: User, attractionId: number): Promise<any> {
      // Check if the user has already favorited the tourist attraction
      const existingFavorite = await prismaClient.favorite.findFirst({
         where: {
            username: user.username,
            attraction_id: attractionId,
         },
      });

      if (!existingFavorite) {
         throw new ResponseError(400, 'User has not favorited the tourist attraction!');
      }

      // Delete the favorite record
      await prismaClient.favorite.delete({
         where: {
            id: existingFavorite.id,
         },
      });

      return true;
   }

   static async checkFavorite(user: User, attractionId: number): Promise<boolean> {
      console.log(user.username, attractionId);
      // Check if the user has already favorited the tourist attraction
      const existingFavorite = await prismaClient.favorite.findFirst({
         where: {
            username: user.username,
            attraction_id: attractionId,
         },
      });

      return existingFavorite ? true : false;
   }
}