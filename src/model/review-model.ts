import { Review } from '@prisma/client';

export type ReviewResponse = {
   id: number;
   attraction_id: number;
   username: string;
   rating: number;
   comment: string;
   created_at: Date;
   updated_at: Date;
};

export type CreateReviewRequest = {
   attraction_id: number;
   rating: number;
   comment: string;
};

export type UpdateReviewRequest = {
   rating?: number;
   comment?: string;
};

export function toReviewResponse(review: Review): ReviewResponse {
   return {
      id: review.id,
      attraction_id: review.attraction_id,
      username: review.username,
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at,
      updated_at: review.updated_at,
   };
}