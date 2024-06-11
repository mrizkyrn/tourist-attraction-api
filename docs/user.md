# User API Documentation
This document describes the API for the User service.

## Register User 
Register a new user.

### Request
- **URL**: `/api/users`
- **Method**: `POST`
- **Request Body**:
```json
{
   "full_name": "Example User",
   "username": "exampleuser",
   "email": "user@example.com",
   "password": "password123",
   "role": "user"
}
```

### Response Body Success
- **Status Code**: `201`
- **Response Body**:
```json
{
   "success": true,
   "message": "User registered successfully",
   "data": {
      "full_name": "Example User",
      "username": "exampleuser",
      "email": "user@example.com",
      "role": "user"
   }
}
``` 

### Response Body Failure
- **Status Code**: `400`
- **Response Body**:
```json
{
   "success": false,
   "message": "User already exists"
}
``` 

## Login User
Login an existing user.

### Request
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
```json
{
  "username": "exampleuser",
  "password": "password123",
}
```

### Response Body Success
- **Status Code**: `200`
- **Response Body**:
```json
{
   "success": true,
   "message": "User logged in successfully",
   "data": {
      "full_name": "Example User",
      "username": "exampleuser",
      "email": "user@example.com",
      "role": "user",
      "token": "unique_token"
   }
}
```

### Response Body Failure
- **Status Code**: `400`
- **Response Body**:
```json
{
   "success": false,
   "message": "Username or password is incorrect"
}
```

## Update User
Update an existing user.

### Request
- **URL**: `/api/users/current`
- **Method**: `PATCH`
- **Headers**:
  - `Authorization`: `Bearer unique_token`
- **Request Body**:
```json
{
   "full_name": "Updated User",
   "email": "user@example.com"
}
```

### Response Body Success
- **Status Code**: `200`
- **Response Body**:
```json
{
   "success": true,
   "message": "User updated successfully",
   "data": {
      "full_name": "Updated User", // optional
      "username": "exampleuser", // optional
      "email": "user@example.com" // optional
   }
}
```

### Response Body Failure
- **Status Code**: `404`
- **Response Body**:
```json
{
   "success": false,
   "message": "User not found"
}
```

## Get User
Get an existing user.

### Request
- **URL**: `/api/users/current`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer unique_token`

### Response Body Success
- **Status Code**: `200`
- **Response Body**:
```json
{
   "success": true,
   "message": "User retrieved successfully",
   "data": {
      "full_name": "Updated User",
      "username": "exampleuser",
      "email": "user@example.com",
      "role": "user"
   }
}
```

### Response Body Failure
- **Status Code**: `401`
- **Response Body**:
```json
{
   "success": false,
   "message": "Unauthorized"
}
```

## Logout User
Logout an existing user.

### Request
- **URL**: `/api/users/logout`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer unique_token`

### Response Body Success
- **Status Code**: `200`
- **Response Body**:
```json
{
   "success": true,
   "message": "User logged out successfully"
}
```

### Response Body Failure
- **Status Code**: `401`
- **Response Body**:
```json
{
   "success": false,
   "message": "Unauthorized"
}
```
