# Review Attraction Documentation

This document describes the API for the review service.

## Table of Contents

-  [Get Reviews](#get-reviews)
-  [Get Review by ID](#get-review-by-id)
-  [Get Reviews by Attraction ID](#get-reviews-by-attraction-id)
-  [Create Review](#create-review)
-  [Update Review](#update-review)
-  [Delete Review](#delete-review)

## Get Reviews

Get a list of reviews.

### Request

-  **URL**: `/api/reviews`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "data": [
      {
         "id": 1,
         "attraction_id": 1,
         "username": "exampleuser",
         "rating": 5,
         "comment": "Great attraction!",
         "created_at": "2024-06-13T11:24:37.577Z",
         "updated_at": "2024-06-13T11:24:37.577Z"
      }
   ]
}
```

### Response Body Failure

-  **Status Code**: `401`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Unauthorized"
}
```

## Get Review by username and attraction ID

Get a review by username and attraction ID.

### Request

-  **URL**: `/api/reviews/username/:username/attraction/:attraction_id`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "data": {
      "id": 1,
      "attraction_id": 1,
      "username": "exampleuser",
      "rating": 5,
      "comment": "Great attraction!",
      "created_at": "2024-06-13T11:24:37.577Z",
      "updated_at": "2024-06-13T11:24:37.577Z"
   }
}
```

### Response Body Failure

-  **Status Code**: `401`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Unauthorized"
}
```


## Get Reviews by Attraction ID

Get a list of reviews by attraction ID.

### Request

-  **URL**: `/api/reviews/attraction/:attraction_id`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "data": [
      {
         "id": 1,
         "attraction_id": 1,
         "username": "exampleuser",
         "rating": 5,
         "comment": "Great attraction!",
         "created_at": "2024-06-13T11:24:37.577Z",
         "updated_at": "2024-06-13T11:24:37.577Z"
      }
   ]
}
```

### Response Body Failure

-  **Status Code**: `401`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Unauthorized"
}
```

## Create Review

Create a review.

### Request

-  **URL**: `/api/reviews`
-  **Method**: `POST`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:
   
   ```json
   {
      "attraction_id": 1,
      "rating": 5,
      "comment": "Great attraction!"
   }
   ```

### Response Body Success

-  **Status Code**: `201`
-  **Response Body**:

```json
{
   "success": true,
   "data": {
      "id": 1,
      "attraction_id": 1,
      "username": "exampleuser",
      "rating": 5,
      "comment": "Great attraction!",
      "created_at": "2024-06-13T11:24:37.577Z",
      "updated_at": "2024-06-13T11:24:37.577Z"
   }
}
```

### Response Body Failure

-  **Status Code**: `400`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Bad Request"
}
```

## Update Review

Update a review.

### Request

-  **URL**: `/api/reviews/:id`
-  **Method**: `PUT`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:
   
   ```json
   {
      "rating": 4,
      "comment": "Good attraction!"
   }
   ```

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "data": {
      "id": 1,
      "attraction_id": 1,
      "username": "exampleuser",
      "rating": 4,
      "comment": "Good attraction!",
      "created_at": "2024-06-13T11:24:37.577Z",
      "updated_at": "2024-06-13T11:24:37.577Z"
   }
}
```

### Response Body Failure

-  **Status Code**: `400`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Bad Request"
}
```

## Delete Review

Delete a review.

### Request

-  **URL**: `/api/reviews/:id`
-  **Method**: `DELETE`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Review deleted successfully"
}
```

### Response Body Failure

-  **Status Code**: `401`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Unauthorized"
}
```
