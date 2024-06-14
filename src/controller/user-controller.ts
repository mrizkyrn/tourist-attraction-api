import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/user-service';
import { RegisterUserRequest, LoginUserRequest, UpdateUserRequest } from '../model/user-model';
import { UserRequest } from '../type/user-request';
import { logger } from '../application/logging';

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

   static async getUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await UserService.getUsers();

         res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async getUserByUsername(req: Request, res: Response, next: NextFunction) {
      try {
         const username = req.params.username as string;
         const response = await UserService.getUserByUsername(username);

         res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async getCurrentUser(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const response = await UserService.getCurrentUser(req.user);
         res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async updateCurrentUser(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: UpdateUserRequest = req.body as UpdateUserRequest;
         const response = await UserService.updateCurrentUser(req.user, request);

         res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: response,
         });
      } catch (error) {
         next(error);
      }
   }

   static async deleteUserByUsername(req: Request, res: Response, next: NextFunction) {
      try {
         const username = req.params.username as string;
         const response = await UserService.deleteUserByUsername(username);

         logger.debug('response: ', response);
         res.status(200).json({
            success: true,
            message: 'User deleted successfully',
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
