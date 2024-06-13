import { NextFunction, Request, Response } from 'express';
import { TouristAttractionService } from '../service/tourist-attraction-service';
import { CreateTouristAttractionRequest } from '../model/tourist-attraction-model';
import { UserRequest } from '../type/user-request';

export class TouristAttractionController {
   static async create(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: CreateTouristAttractionRequest = req.body as CreateTouristAttractionRequest;
         const response = await TouristAttractionService.create(req.user, request);

         res.status(201).json({
            success: true,
            message: 'Tourist attraction created successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async search(req: Request, res: Response, next: NextFunction) {
      try {
         const queryParams = req.query;
         const response = await TouristAttractionService.search(queryParams);

         res.status(200).json({
            success: true,
            message: 'Tourist attractions retrieved successfully',
            response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async getDetailById(req: Request, res: Response, next: NextFunction) {
      try {
         const id = Number(req.params.id);
         const response = await TouristAttractionService.getDetailById(id);

         res.status(200).json({
            success: true,
            message: 'Tourist attraction retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async getByStatus(req: Request, res: Response, next: NextFunction) {
      try {
         const status = req.params.status;
         const response = await TouristAttractionService.getByStatus(status);

         res.status(200).json({
            success: true,
            message: 'Tourist attractions retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }
}
