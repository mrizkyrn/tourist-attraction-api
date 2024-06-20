import bcrypt from 'bcrypt';
import {
   LoginUserRequest,
   RegisterUserRequest,
   UpdatePasswordRequest,
   UpdateUserRequest,
   UserResponse,
   toUserResponse,
} from '../model/user-model';
import { Validation } from '../validation/validation';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { UserValidation } from '../validation/user-validation';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export class UserService {
   static async register(request: RegisterUserRequest): Promise<UserResponse> {
      // Validate the request body
      const registerRequest = Validation.validate(UserValidation.REGISTER, request);

      // Check if the username is already taken
      const usernameExists = await prismaClient.user.findUnique({
         where: { username: registerRequest.username },
      });

      if (usernameExists) {
         throw new ResponseError(400, 'Username already exists');
      }

      // Hash the password
      registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

      // Create the user
      console.log(registerRequest);
      const user = await prismaClient.user.create({
         data: registerRequest,
      });

      // Return the user response
      return toUserResponse(user);
   }

   static async login(request: LoginUserRequest): Promise<UserResponse> {
      // Validate the request body
      const loginRequest = Validation.validate(UserValidation.LOGIN, request);

      // Check if the user exists
      const user = await prismaClient.user.findUnique({
         where: { username: loginRequest.username },
      });

      if (!user) {
         throw new ResponseError(400, 'Invalid username or password');
      }

      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(loginRequest.password, user.password);

      if (!passwordMatch) {
         throw new ResponseError(400, 'Invalid username or password');
      }

      // Generate a JWT token
      const token = jwt.sign(
         { id: user.id, full_name: user.full_name, email: user.email, username: user.username, role: user.role },
         String(process.env.JWT_SECRET),
         {
            expiresIn: 60 * 60 * 24,
         }
      );

      // Return the user response
      const userResponse = toUserResponse(user);
      userResponse.token = token;
      return userResponse;
   }

   static async getAll(): Promise<UserResponse[]> {
      // Get all users
      const users = await prismaClient.user.findMany();

      // Return the user response
      return users.map(toUserResponse);
   }

   static async getByUsername(username: string): Promise<UserResponse> {
      // Get the user by username
      const user = await prismaClient.user.findUnique({
         where: { username: username },
      });

      if (!user) {
         throw new ResponseError(404, 'User not found');
      }

      // Return the user response
      return toUserResponse(user);
   }

   static async getCurrent(user: User): Promise<UserResponse> {
      // Return the user response
      return toUserResponse(user);
   }

   static async updateCurrent(user: User, request: UpdateUserRequest): Promise<UserResponse> {
      // Validate the request body
      const updateRequest = Validation.validate(UserValidation.UPDATE, request);

      // Check if the username is already taken
      if (updateRequest.username) {
         const usernameExists = await prismaClient.user.findUnique({
            where: { username: updateRequest.username },
         });

         if (usernameExists) {
            throw new ResponseError(400, 'Username already exists');
         }
      }

      // Update the user
      const updatedUser = await prismaClient.user.update({
         where: { id: user.id },
         data: updateRequest,
      });

      // Update the user in the JWT token
      const token = jwt.sign(
         { id: updatedUser.id, full_name: updatedUser.full_name, email: updatedUser.email, username: updatedUser.username, role: updatedUser.role },
         String(process.env.JWT_SECRET),
         {
            expiresIn: 60 * 60 * 24,
         }
      );
      
      // Return the user response
      const userResponse = toUserResponse(updatedUser);
      userResponse.token = token;
      return userResponse;
   }

   static async updatePassword(user: User, request: UpdatePasswordRequest): Promise<UserResponse> {
      // Validate the request body
      const updatePasswordRequest = Validation.validate(UserValidation.UPDATE_PASSWORD, request);

      // Get password from the user
      const userPassword = await prismaClient.user.findUnique({
         where: { id: user.id },
         select: { password: true },
      });

      if (!userPassword) {
         throw new ResponseError(404, 'User not found');
      }

      // Check if the old password is correct
      const passwordMatch = await bcrypt.compare(updatePasswordRequest.old_password, userPassword.password);

      if (!passwordMatch) {
         throw new ResponseError(400, 'Invalid old password');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(updatePasswordRequest.new_password, 10);

      // Update the user
      const updatedUser = await prismaClient.user.update({
         where: { id: user.id },
         data: { password: hashedPassword },
      });

      // Return the user response
      return toUserResponse(updatedUser);
   }

   static async deleteByUsername(username: string): Promise<UserResponse> {
      // Get the user by username
      const user = await prismaClient.user.findUnique({
         where: { username: username },
      });

      if (!user) {
         throw new ResponseError(404, 'User not found');
      }

      // Delete the user
      await prismaClient.user.delete({
         where: { username: username },
      });

      // Return the user response
      return toUserResponse(user);
   }
}
