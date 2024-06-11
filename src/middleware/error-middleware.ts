import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../error/response-error';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
   if (error instanceof ZodError) {
      
      
      res.status(400).json({
         success: false,
         message: error.errors.map((error) => `${error.path[0]} is ${error.message}`).join(', '),
      });
   } else if (error instanceof ResponseError) {
      res.status(error.status).json({
         success: false,
         message: error.message,
      });
   } else {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};
