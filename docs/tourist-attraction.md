# Tourist Attraction Documentation

This document describes the API for the Tourist Attraction service.

## Table of Contents

-  [Create Tourist Attraction](#create-tourist-attraction)
-  [Search Tourist Attractions](#search-tourist-attractions)
-  [Get Tourist Attraction Details by ID](#get-tourist-attraction-details-by-id)
-  [Get Tourist Attractions by Status](#get-tourist-attractions-by-status)
-  [Update Tourist Attraction](#update-tourist-attraction)
-  [Delete Tourist Attraction by ID](#delete-tourist-attraction-by-id)

## Create Tourist Attraction

Create a new tourist attraction.

### Request

-  **URL**: `/api/tourist-attractions`
-  **Method**: `POST`
-  **Request Body**:

```json
{
   "thumbnail": "https://example.com/thumbnail.jpg",
   "name": "Example Attraction",
   "description": "This is an example description of a tourist attraction.",
   "category": "Example Category",
   "tags": ["tag1", "tag2", "tag3"],
   "entrance_fee": 15.0,
   "address": "123 Example Street",
   "city": "Example City",
   "province": "Example State",
   "country": "Example Country",
   "postal_code": "12345",
   "latitude": 40.7128, // Optional
   "longitude": -74.006 // Optional
}
```

### Response Body Success

-  **Status Code**: `201`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attraction created successfully",
   "data": {
      "id": 1,
      "user_id": 1,
      "thumbnail": "https://example.com/thumbnail.jpg",
      "name": "Example Attraction",
      "description": "This is an example description of a tourist attraction.",
      "category": "Example Category",
      "tags": ["tag1", "tag2", "tag3"],
      "rating": 0,
      "entrance_fee": 15,
      "address": "123 Example Street",
      "city": "Example City",
      "province": "Example State",
      "country": "Example Country",
      "postal_code": "12345",
      "latitude": 40.7128,
      "longitude": -74.006,
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
   "message": "Invalid request body"
}
```

## Search Tourist Attractions

Search for approved tourist attractions by name, with optional filters and pagination.

### Request

-  **URL**: `/api/tourist-attractions`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Query Parameters**:
   -  `name`: (Required) Search by name
   -  `category`: (Optional) Filter by category
   -  `city`: (Optional) Filter by city
   -  `province`: (Optional) Filter by province
   -  `tags`: (Optional) Filter by tags
   -  `sort`: (Optional) Sort by rating
   -  `order`: (Optional) Sort order (asc or desc)
   -  `page`: (Optional) Page number (default: 1)
   -  `limit`: (Optional) Number of results per page (default: 10)

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attractions retrieved successfully",
   "data": [
      {
         "id": 1,
         "user_id": 1,
         "thumbnail": "https://example.com/thumbnail.jpg",
         "name": "Example Attraction",
         "description": "This is an example description of a tourist attraction.",
         "category": "Example Category",
         "tags": ["tag1", "tag2", "tag3"],
         "rating": 0,
         "city": "Example City",
         "province": "Example State"
      }
   ],
   "pagination": {
      "total": 1,
      "current_page": 1,
      "total_pages": 1,
      "limit": 10
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

## Get Tourist Attraction Details by ID

Get details of a tourist attraction by ID.

### Request

-  **URL**: `/api/tourist-attractions/:id`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attraction retrieved successfully",
   "data": {
      "id": 1,
      "user_id": 1,
      "thumbnail": "https://example.com/thumbnail.jpg",
      "name": "Example Attraction",
      "description": "This is an example description of a tourist attraction.",
      "category": "Example Category",
      "tags": ["tag1", "tag2", "tag3"],
      "entrance_fee": 15.0,
      "rating": 0,
      "status": "PENDING",
      "address": "123 Example Street",
      "city": "Example City",
      "province": "Example State",
      "country": "Example Country",
      "postal_code": "12345",
      "latitude": 40.7128,
      "longitude": -74.006,
      "updated_at": "2024-06-12T00:00:00.000Z"
   }
}
```

### Response Body Failure

-  **Status Code**: `404`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Tourist attraction not found"
}
```

## Get Tourist Attractions by Status

Get tourist attractions by status.

### Request

-  **URL**: `/api/tourist-attractions/status/:status`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attractions retrieved successfully",
   "data": [
      {
         "id": 1,
         "user_id": 1,
         "thumbnail": "https://example.com/thumbnail.jpg",
         "name": "Example Attraction",
         "description": "This is an example description of a tourist attraction.",
         "category": "Example Category",
         "tags": ["tag1", "tag2", "tag3"],
         "rating": 0,
         "status": "APPROVED",
         "city": "Example City",
         "province": "Example State"
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

## Update Tourist Attraction

Update an existing tourist attraction.

### Request

-  **URL**: `/api/tourist-attractions/:id`
-  **Method**: `PUT`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:

   ```json
   {
      "thumbnail": "https://example.com/thumbnail.jpg",
      "name": "Updated Attraction",
      "description": "This is an updated description of a tourist attraction.",
      "entrance_fee": 20.0,
      "category": "Updated Category",
      "tags": ["tag1", "tag2", "tag3"],
      "address": "123 Example Street",
      "city": "Example City",
      "province": "Example State",
      "country": "Example Country",
      "postal_code": "12345",
      "latitude": 40.7128,
      "longitude": -74.006
   }
   ```

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attraction updated successfully",
   "data": {
      "id": 1,
      "user_id": 1,
      "thumbnail": "https://example.com/thumbnail.jpg",
      "name": "Updated Attraction",
      "description": "This is an updated description of a tourist attraction.",
      "category": "Updated Category",
      "tags": ["tag1", "tag2", "tag3"],
      "rating": 0,
      "entrance_fee": 20,
      "address": "123 Example Street",
      "city": "Example City",
      "province": "Example State",
      "country": "Example Country",
      "postal_code": "12345",
      "latitude": 40.7128,
      "longitude": -74.006,
      "created_at": "2024-06-13T11:24:37.577Z",
      "updated_at": "2024-06-13T11:24:37.577Z"
   }
}
```

### Response Body Failure

-  **Status Code**: `404`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Tourist attraction not found"
}
```

## Delete Tourist Attraction by ID

Delete an existing tourist attraction by ID.

### Request

-  **URL**: `/api/tourist-attractions/:id`
-  **Method**: `DELETE`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Tourist attraction deleted successfully"
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

[]: # (END) -->
