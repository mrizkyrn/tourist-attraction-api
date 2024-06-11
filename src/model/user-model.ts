import { User } from '@prisma/client';

export type UserResponse = {
   full_name: string;
   email: string;
   username: string;
   role: string;
   token?: string;
};

export type RegisterUserRequest = {
   full_name: string;
   email: string;
   username: string;
   password: string;
};

export type LoginUserRequest = {
   username: string;
   password: string;
};

export type UpdateUserRequest = {
   full_name?: string;
   email?: string;
   username?: string;
   password?: string;
};

export function toUserResponse(user: User): UserResponse {
   return {
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      role: user.role,
   };
}
