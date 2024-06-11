import { User } from '@prisma/client';

export type UserResponse = {
   full_name: string;
   username: string;
   email: string;
   role: string;
   token?: string;
};

export type RegisterUserRequest = {
   full_name: string;
   username: string;
   email: string;
   password: string;
};

export type LoginUserRequest = {
   username: string;
   password: string;
};

export function toUserResponse(user: User): UserResponse {
   return {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      role: user.role,
   };
}
