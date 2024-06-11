import bcrypt from 'bcrypt';
import { RegisterUser, UserResponse, toUserResponse } from '../model/user-model';
import { Validation } from '../validation/validation';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { UserValidation } from '../validation/user-validation';

export class UserService {
   static async register(request: RegisterUser): Promise<UserResponse> {
      // Validate the request body
      const registerUser = Validation.validate(UserValidation.REGISTER, request);

      // Check if the username is already taken
      const usernameExists = await prismaClient.user.findUnique({
         where: { username: registerUser.username },
      });

      if (usernameExists) {
         throw new ResponseError(400, 'Username already exists');
      }

      // Hash the password
      registerUser.password = await bcrypt.hash(registerUser.password, 10);

      // Create the user
      const user = await prismaClient.user.create({
         data: registerUser,
      });

      // Return the user response
      return toUserResponse(user);
   }
}
