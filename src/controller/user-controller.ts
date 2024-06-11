import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { RegisterUser } from '../model/user-model';

export class UserController {
   static async register(req: Request, res: Response, next: NextFunction) {
      try {
         const request: RegisterUser = req.body as RegisterUser;
         const response = await UserService.register(request);

         res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }
}
