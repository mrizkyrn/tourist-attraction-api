import { NextFunction, Request, Response } from 'express';
import { ReviewService } from '../service/review-service';
import { CreateReviewRequest, UpdateReviewRequest } from '../model/review-model';
import { UserRequest } from '../type/user-request';
import { logger } from '../application/logging';

export class ReviewController {
   static async getByAttractionId(req: Request, res: Response, next: NextFunction) {
      try {
         const attractionId = parseInt(req.params.id);
         const response = await ReviewService.getByAttractionId(attractionId);

         res.status(200).json({
            success: true,
            message: 'Reviews retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async getByUsernameAndAttractionId(req: Request, res: Response, next: NextFunction) {
      try {
         const username = req.params.username as string;
         const attractionId = parseInt(req.params.id);
         const response = await ReviewService.getByUsernameAndAttractionId(username, attractionId);

         res.status(200).json({
            success: true,
            message: 'Review retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async create(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: CreateReviewRequest = req.body as CreateReviewRequest;
         const response = await ReviewService.create(req.user, request);

         res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async update(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: UpdateReviewRequest = req.body as UpdateReviewRequest;
         const attractionId = parseInt(req.params.id);
         const response = await ReviewService.update(req.user, attractionId, request);

         res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async delete(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const attractionId = parseInt(req.params.id);
         const response = await ReviewService.delete(req.user, attractionId);

         res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }
}
