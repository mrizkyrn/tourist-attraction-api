import { Favorite } from '@prisma/client';

export type FavoriteResponse = {
   id: number;
   attraction_id: number;
   username: string;
   created_at: Date;
   updated_at: Date;
};

export type CreateFavoriteRequest = {
   attraction_id: number;
};

export function toFavoriteResponse(favorite: Favorite): FavoriteResponse {
   return {
      id: favorite.id,
      attraction_id: favorite.attraction_id,
      username: favorite.username,
      created_at: favorite.created_at,
      updated_at: favorite.updated_at,
   };
}