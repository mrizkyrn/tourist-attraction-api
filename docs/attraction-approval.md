# Attraction Approval Documentation

This document describes the process of approving attractions.

## Get Attraction Approvals

Get a list of historical attraction approvals.

### Request

-  **URL**: `/api/attraction-approvals`
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
         "status": "APPROVED",
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

## Delete Attraction Approval

Delete an attraction approval.

### Request

-  **URL**: `/api/attraction-approvals/:id`
-  **Method**: `DELETE`
-  **Headers**:
   -  `Authorization`: `Bearer unique_token`

### Response Body Success

-  **Status Code**: `200`
-  **Response Body**:

```json
{
   "success": true,
   "message": "Attraction approval deleted"
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