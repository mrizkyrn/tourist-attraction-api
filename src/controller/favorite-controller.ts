import { NextFunction, Request, Response } from 'express';
import { FavoriteService } from '../service/favorite-service';
import { CreateFavoriteRequest } from '../model/favorite-model';
import { UserRequest } from '../type/user-request';
import { logger } from '../application/logging';

export class FavoriteController {
   static async getByUsername(req: Request, res: Response, next: NextFunction) {
      try {
         const username = req.params.username as string;
         const response = await FavoriteService.getByUsername(username);

         res.status(200).json({
            success: true,
            message: 'Favorites retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async create(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: CreateFavoriteRequest = req.body as CreateFavoriteRequest;
         const response = await FavoriteService.create(req.user, request);

         res.status(201).json({
            success: true,
            message: 'Favorite created successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async delete(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const attractionId = parseInt(req.params.id);
         const response = await FavoriteService.delete(req.user, attractionId);

         res.status(200).json({
            success: true,
            message: 'Favorite deleted successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async checkFavorite(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const attraction_id = parseInt(req.query.attraction_id as string);
         const response = await FavoriteService.checkFavorite(req.user, attraction_id);

         res.status(200).json({
            success: true,
            message: 'Favorite checked successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }
}