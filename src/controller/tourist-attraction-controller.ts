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
}