import { User } from '@prisma/client';

export type UserResponse = {
   full_name: string;
   username: string;
   email: string;
   token?: string;
};

export type RegisterUser = {
   full_name: string;
   username: string;
   email: string;
   password: string;
};

export function toUserResponse(user: User): UserResponse {
   return {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
   };
}
