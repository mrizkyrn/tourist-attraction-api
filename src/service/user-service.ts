import bcrypt from 'bcrypt';
import { LoginUserRequest, RegisterUserRequest, UserResponse, toUserResponse } from '../model/user-model';
import { Validation } from '../validation/validation';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { UserValidation } from '../validation/user-validation';
import jwt from 'jsonwebtoken';

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
      const token = jwt.sign({ id: user.id, role: user.role }, String(process.env.JWT_SECRET), {
         expiresIn: 60 * 60, 
      });

      // Return the user response
      const userResponse = toUserResponse(user);
      userResponse.token = token;
      return userResponse;
   }
}
