# Favorite Documentation

This document describes the API for the favorite service.

## Table of Contents

-  [Get Favorites by username](#get-favorites-by-username)
-  [Create Favorite](#create-favorite)
-  [Delete Favorite](#delete-favorite)

## Get Favorites by username

Get a list of favorites by username.

### Request

-  **URL**: `/api/favorites`
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

## Create Favorite

Create a favorite.

### Request

-  **URL**: `/api/favorites`
-  **Method**: `POST`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:
   
   ```json
   {
      "attraction_id": 1
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

## Delete Favorite

Delete a favorite.

### Request

-  **URL**: `/api/favorites/:id`
-  **Method**: `DELETE`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `204`
-  **Response Body**:

```json
{
   "success": true
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

## Check Favorite

Check if an attraction is favorited.

### Request

-  **URL**: `/api/favorites/check`
-  **Method**: `POST`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:
   
   ```json
   {
      "attraction_id": 1
   }
   ```

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "data": {
      "isFavorite": true
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