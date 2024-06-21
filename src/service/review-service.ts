import { CreateReviewRequest, UpdateReviewRequest, toReviewResponse } from '../model/review-model';
import { prismaClient } from '../application/database';
import { Validation } from '../validation/validation';
import { ReviewValidation } from '../validation/review-validation';
import { ResponseError } from '../error/response-error';
import { User } from '@prisma/client';
import { UpdatePasswordRequest } from '../model/user-model';

export class ReviewService {
   static async getByAttractionId(attractionId: number): Promise<any> {
      // Retrieve the reviews for the attraction
      const reviews = await prismaClient.review.findMany({
         where: {
            attraction_id: attractionId,
         },
      });

      // Return the review responses
      return reviews.map((review) => toReviewResponse(review));
   }

   static async getByUsernameAndAttractionId(username: string, attractionId: number): Promise<any> {
      // Retrieve the review for the attraction
      const review = await prismaClient.review.findFirst({
         where: {
            username,
            attraction_id: attractionId,
         },
      });

      // Return the review response
      return review ? toReviewResponse(review) : null;
   }

   static async create(user: User, request: CreateReviewRequest): Promise<any> {
      // Validate the request body
      const createRequest = Validation.validate(ReviewValidation.CREATE, request);

      // Check if the user has already reviewed the tourist attraction
      const existingReview = await prismaClient.review.findFirst({
         where: {
            username: user.username,
            attraction_id: createRequest.attraction_id,
         },
      });

      if (existingReview) {
         throw new ResponseError(400, 'User has already reviewed the tourist attraction');
      }

      // Create the review record
      const record = {
         ...createRequest,
         username: user.username,
      };

      // Create the review
      const review = await prismaClient.review.create({
         data: record,
      });

      // Update the average rating of the tourist attraction
      const reviews = await prismaClient.review.findMany({
         where: {
            attraction_id: createRequest.attraction_id,
         },
      });

      const totalRating = reviews.reduce((total, review) => total + review.rating, 0);

      await prismaClient.touristAttraction.update({
         where: {
            id: createRequest.attraction_id,
         },
         data: {
            rating: totalRating / reviews.length,
         },
      });

      // Return the review response
      return toReviewResponse(review);
   }

   static async update(user: User, id: number, request: UpdateReviewRequest): Promise<any> {
      
      // Validate the request body
      const updateRequest = Validation.validate(ReviewValidation.UPDATE, request);

      // Check if the review exists
      const existingReview = await prismaClient.review.findFirst({
         where: {
            id,
            username: user.username,
         },
      });

      if (!existingReview) {
         throw new ResponseError(404, 'Review not found');
      }

      // Update the review record
      const record = {
         ...updateRequest,
         username: user.username,
      };

      // Update the review
      const review = await prismaClient.review.update({
         where: {
            id,
         },
         data: record,
      });

      // Update the average rating of the tourist attraction
      const reviews = await prismaClient.review.findMany({
         where: {
            attraction_id: existingReview.attraction_id,
         },
      });

      const totalRating = reviews.reduce((total, review) => total + review.rating, 0);

      await prismaClient.touristAttraction.update({
         where: {
            id: existingReview.attraction_id,
         },
         data: {
            rating: totalRating / reviews.length,
         },
      });

      // Return the review response
      return toReviewResponse(review);
   }

   static async delete(user: User, id: number): Promise<void> {
      // Check if the review exists
      const existingReview = await prismaClient.review.findFirst({
         where: {
            id,
            username: user.username,
         },
      });

      if (!existingReview) {
         throw new ResponseError(404, 'Review not found');
      }

      // Delete the review
      await prismaClient.review.delete({
         where: {
            id,
         },
      });

      // Update the average rating of the tourist attraction
      const reviews = await prismaClient.review.findMany({
         where: {
            attraction_id: existingReview.attraction_id,
         },
      });

      const totalRating = reviews.reduce((total, review) => total + review.rating, 0);

      await prismaClient.touristAttraction.update({
         where: {
            id: existingReview.attraction_id,
         },
         data: {
            rating: totalRating / reviews.length,
         },
      });
   }
}
