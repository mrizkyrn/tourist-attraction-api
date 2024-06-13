# User API Documentation

This document describes the API for the User service.

## Table of Contents

-  [Register User](#register-user)
-  [Login User](#login-user)
-  [Get Users](#get-users)
-  [Get User by Username](#get-user-by-username)
-  [Get Current User](#get-current-user)
-  [Update Current User](#update-current-user)
-  [Delete User by ID](#delete-user-by-id)
-  [Logout User](#logout-user)

## Register User

Register a new user.

### Request

-  **URL**: `/api/users`
-  **Method**: `POST`
-  **Request Body**:

```json
{
   "full_name": "Example User",
   "email": "user@example.com",
   "username": "exampleuser",
   "password": "password123",
   "role": "USER"
}
```

### Response Body Success

-  **Status Code**: `201`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User registered successfully",
   "data": {
      "full_name": "Example User",
      "email": "user@example.com",
      "username": "exampleuser",
      "role": "USER"
   }
}
```

### Response Body Failure

-  **Status Code**: `400`
-  **Response Body**:

```json
{
   "success": false,
   "message": "User already exists"
}
```

## Login User

Login an existing user.

### Request

-  **URL**: `/api/users/login`
-  **Method**: `POST`
-  **Request Body**:

```json
{
   "username": "exampleuser",
   "password": "password123"
}
```

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User logged in successfully",
   "data": {
      "full_name": "Example User",
      "email": "user@example.com",
      "username": "exampleuser",
      "role": "USER",
      "token": "unique_token"
   }
}
```

### Response Body Failure

-  **Status Code**: `400`
-  **Response Body**:

```json
{
   "success": false,
   "message": "Username or password is incorrect"
}
```

## Get Users

Get all users.

### Request

-  **URL**: `/api/users`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Users retrieved successfully",
   "data": [
      {
         "full_name": "Example User",
         "email": "user@example.com",
         "username": "exampleuser",
         "role": "USER"
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

## Get User by Username

Get an existing user by username.

### Request

-  **URL**: `/api/users/username/:username`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User retrieved successfully",
   "data": {
      "full_name": "Example User",
      "email": "user@example.com",
      "username": "exampleuser",
      "role": "USER"
   }
}
```

### Response Body Failure

-  **Status Code**: `404`
-  **Response Body**:

```json
{
   "success": false,
   "message": "User not found"
}
```

## Get Current User

Get the current user.

### Request

-  **URL**: `/api/users/current`
-  **Method**: `GET`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User retrieved successfully",
   "data": {
      "full_name": "Example User",
      "email": "user@example.com",
      "username": "exampleuser",
      "role": "USER"
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

## Update Current User

Update the current user.

### Request

-  **URL**: `/api/users/current`
-  **Method**: `PATCH`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`
-  **Request Body**:

```json
{
   "full_name": "Updated User", // optional
   "email": "user@example.com", // optional
   "username": "exampleuser", // optional
   "password": "password" // optional
}
```

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User updated successfully",
   "data": {
      "full_name": "Updated User",
      "email": "user@example.com",
      "username": "exampleuser"
   }
}
```

### Response Body Failure

-  **Status Code**: `404`
-  **Response Body**:

```json
{
   "success": false,
   "message": "User not found"
}
```

## Delete User by Usernae

Delete an existing user by username.

### Request

-  **URL**: `/api/users/username/:username`
-  **Method**: `DELETE`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User deleted successfully"
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

## Logout User

Logout an existing user.

### Request

-  **URL**: `/api/users/logout`
-  **Method**: `POST`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "User logged out successfully"
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
