import { NextFunction, Request, Response } from 'express';
import { TouristAttractionService } from '../service/tourist-attraction-service';
import { CreateTouristAttractionRequest, TouristAttractionsQueryParams } from '../model/tourist-attraction-model';
import { UserRequest } from '../type/user-request';
import { logger } from '../application/logging';
import path from 'path';
import fs from 'fs';

export class TouristAttractionController {
   static async create(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: CreateTouristAttractionRequest = req.body as CreateTouristAttractionRequest;
         
         if (!req.file) {
            throw new Error('Thumbnail is required');
         }

         request.thumbnail = path.join('/images', req.file.filename);
         
         const response = await TouristAttractionService.create(req.user, request);

         res.status(201).json({
            success: true,
            message: 'Tourist attraction created successfully',
            data: response,
         });
      } catch (error) {
         if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
         }
         
         next(error);
      }
   }

   static async search(req: Request, res: Response, next: NextFunction) {
      try {
         const request: TouristAttractionsQueryParams = {
            name: req.query.name as string,
            category: req.query.category as string,
            city: req.query.city as string,
            province: req.query.province as string,
            tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
            sort: req.query.sort as string,
            order: req.query.order as 'asc' | 'desc',
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10,
         };

         const response = await TouristAttractionService.search(request);

         res.status(200).json({
            success: true,
            message: 'Tourist attractions retrieved successfully',
            data: response.data,
            pagination: response.pagination,
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

   static async getByUsername(req: Request, res: Response, next: NextFunction) {
      try {
         const username = req.params.username;
         const response = await TouristAttractionService.getByUsername(username);

         res.status(200).json({
            success: true,
            message: 'Tourist attractions retrieved successfully',
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

   static async update(req: UserRequest, res: Response, next: NextFunction) {
      console.log("req.body: ", req.body);
      try {
         const id = Number(req.params.id);
         const request: CreateTouristAttractionRequest = req.body as CreateTouristAttractionRequest;


         const response = await TouristAttractionService.update(req.user, id, request);

         res.status(200).json({
            success: true,
            message: 'Tourist attraction updated successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async delete(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const id = Number(req.params.id);
         const response = await TouristAttractionService.delete(req.user, id);
         
         logger.debug("response: ", response);
         res.status(200).json({
            success: true,
            message: 'Tourist attraction deleted successfully',
         });
      } catch (error) {
         next(error);
      }
   }
}
