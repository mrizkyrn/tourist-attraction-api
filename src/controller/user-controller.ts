import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { RegisterUserRequest, LoginUserRequest } from '../model/user-model';

export class UserController {
   static async register(req: Request, res: Response, next: NextFunction) {
      try {
         const request: RegisterUserRequest = req.body as RegisterUserRequest;
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

   static async login(req: Request, res: Response, next: NextFunction) {
      try {
         const request: LoginUserRequest = req.body as LoginUserRequest;
         const response = await UserService.login(request);

         res.cookie('access_token', response.token, { httpOnly: true, sameSite: 'strict', secure: true });

         res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async logout(req: Request, res: Response, next: NextFunction) {
      try {
         res.clearCookie('access_token');

         res.status(200).json({
            success: true,
            message: 'User logged out successfully',
         });
      } catch (error) {
         next(error);
      }
   }
}
