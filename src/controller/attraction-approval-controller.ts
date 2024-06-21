import { NextFunction, Request, Response } from 'express';
import { AttractionApprovalService } from '../service/attraction-approval-service';

export class AttractionApprovalController {
   static async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await AttractionApprovalService.getAll();

         res.status(200).json({
            success: true,
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }
}