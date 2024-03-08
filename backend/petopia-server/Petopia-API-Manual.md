# How to use the Petopia API <!-- omit in toc -->
This document lists all the available endpoints and their usage for the Petopia API.

The base URL for the API is ```http://localhost:5290```.

## Table of Contents <!-- omit in toc -->

- [Customers](#customers)
  - [🟡 Register a new customer:](#register-a-new-customer)
  - [🟡 Login as a customer:](#login-as-a-customer)
  - [🟡 Modify customer details: ```Customer```](#modify-customer-details-customer)
  - [🟢 Get all customers: ```Admin```](#get-all-customers-admin)
  - [🟢 Get customer by id: ```Admin```](#get-customer-by-id-admin)
- [Categories](#categories)
  - [🟡 Create a new category: ```Admin```](#create-a-new-category-admin)
  - [🟢 Get all categories:](#get-all-categories)
  - [🟢 Get category by id:](#get-category-by-id)
- [Products](#products)
  - [🟡 Create a new product: ```Admin``` ```Form-Data```](#create-a-new-product-admin-form-data)
  - [🟡 Remove a product: ```Admin```](#remove-a-product-admin)
  - [🟢 Get all products:](#get-all-products)
  - [🟢 Get product by id:](#get-product-by-id)
- [Customer Orders](#customer-orders)
  - [🟡 Create a new order: ```Customer```](#create-a-new-order-customer)
  - [🟢 Get order by id:](#get-order-by-id)
  - [🟢 Get all orders by customer id:](#get-all-orders-by-customer-id)
- [Admins](#admins)
  - [🟡 Register a new admin:](#register-a-new-admin)
  - [🟡 Login as an admin:](#login-as-an-admin)
  - [🟢 Get all admins: ```Admin```](#get-all-admins-admin)
  - [🟢 Get admin by id: ```Admin```](#get-admin-by-id-admin)
- [Server Response Status](#server-response-status)
  - [🟩 200 OK, 201 Created, 204 No Content](#200-ok-201-created-204-no-content)
  - [🟥 400 Bad Request](#400-bad-request)
  - [🟥 401 Unauthorized](#401-unauthorized)
  - [🟥 403 Forbidden](#403-forbidden)
  - [🟥 404 Not Found](#404-not-found)
  - [🟥 500 Internal Server Error](#500-internal-server-error)

> &nbsp;
> <br>🟢 - GET Request
> <br>🟡 - POST Request
> <br>🟩 - Success Response
> <br>🟥 - Error Response
> <br>```Admin``` - Requires admin token
> <br>```Customer``` - Requires customer token
> <br>```Form-Data``` - Requires form-data
> <br>&nbsp;

## Customers

### Register a new customer:

🟡 Request ```POST /api/customers/register```
```json
{
    "customerUsername": "customer_a1", // required
    "customerPassword": "customer_a1", // required
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore"
}
```

Response [```201 Created```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request)
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImN1c3RvbWVyX2ExIiwibmFtZWlkIjoiZDc1MjY3NjMtNTRhNS00NWJmLWFhY2MtOTMyMzYwOThmYWRiIiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNzA5NzM5MDg5LCJleHAiOjE3MDk3NDI2ODksImlhdCI6MTcwOTczOTA4OSwiaXNzIjoicGV0b3BpYSIsImF1ZCI6InBldG9waWEifQ.LbCzSmecdrXwr74ksvjha8kFmf-c61ffpugmbYwDsc0"
}
```

### Login as a customer:

🟡 Request ```POST /api/customers/login```

```json
{
    "customerUsername": "customer_a1", // required
    "customerPassword": "customer_a1"  // required
}
```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```404 Not Found```](#404-not-found)
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImN1c3RvbWVyX2ExIiwibmFtZWlkIjoiZDc1MjY3NjMtNTRhNS00NWJmLWFhY2MtOTMyMzYwOThmYWRiIiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNzA5NzM5MDg5LCJleHAiOjE3MDk3NDI2ODksImlhdCI6MTcwOTczOTA4OSwiaXNzIjoicGV0b3BpYSIsImF1ZCI6InBldG9waWEifQ.LbCzSmecdrXwr74ksvjha8kFmf-c61ffpugmbYwDsc0"
}
```

### Modify customer details: ```Customer```

🟡 Request ```POST /api/customers/modify```
```json
{
    "newContact": "12345678",
    "newAddress": "PolyU, Hong Kong",
    "newPassword": "customer_a1_password"
}
```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden) / [```404 Not Found (Extreme Case)```](#404-not-found)
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "12345678",
    "customerAddress": "PolyU, Hong Kong"
}
```

### Get all customers: ```Admin```

🟢 Request ```GET /api/customers/all```

Response [```200 OK (Can be empty array if no customers exist)```](#200-ok-201-created-204-no-content) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden)
```json
[
    {
        "customerId": "2cac11e3-d5eb-40c1-b174-b45f72dffb04",
        "customerUsername": "customer_a2",
        "customerContact": null,
        "customerAddress": null
    },
    {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong"
    }
]
```

### Get customer by id: ```Admin```

🟢 Request ```GET /api/customers/{customerId}```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden) / [```404 Not Found```](#404-not-found)
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "12345678",
    "customerAddress": "PolyU, Hong Kong"
}
```

## Categories

### Create a new category: ```Admin```

🟡 Request ```POST /api/categories/create```
```json
{
    "categoryName": "Dog", // required
    "categoryDescription": "Anything related to dogs."
}
```

Response [```201 Created```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden)
```json
{
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
    "categoryName": "Dog",
    "categoryDescription": "Anything related to dogs.",
    "products": null
}
```

### Get all categories:

🟢 Request ```GET /api/categories/all```

Response [```200 OK (Can be empty array if no categories exist)```](#200-ok-201-created-204-no-content)
```json
[
    {
        "categoryId": "3f02a7c7-226b-46db-b286-9f008120ed1e",
        "categoryName": "Cat",
        "categoryDescription": "Anything related to cats.",
        "products": []
    },
    {
        "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
        "categoryName": "Dog",
        "categoryDescription": "Anything related to dogs.",
        "products": []
    }
]
```

### Get category by id:

🟢 Request ```GET /api/categories/{categoryId}```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```404 Not Found```](#404-not-found)
```json
{
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
    "categoryName": "Dog",
    "categoryDescription": "Anything related to dogs.",
    "products": []
}
```

## Products

### Create a new product: ```Admin``` ```Form-Data```

🟡 Request ```POST /api/products/create```
```json
{
    "productName": "Dog Food Number 1", // required
    "productDescription": "The best dog food in the world.",
    "productPrice": 12.99,
    "productQuantity": 60,
    "productKeywords": "dog, food, green",
    "productImage": "dog_food.jpg",
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5"
}
```

Response [```201 Created```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden)
```json
{
    "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
    "productName": "Dog Food Number 1",
    "productDescription": "The best dog food in the world.",
    "productPrice": 12.99,
    "productQuantity": 60,
    "productKeywords": "dog, food, green",
    "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
    "category": {
        "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
        "categoryName": "Dog",
        "categoryDescription": "Anything related to dogs."
    }
}
```

### Remove a product: ```Admin```

🟡 Request ```POST /api/products/remove/{productId}```

Response ```204 No Content``` / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden) / [```404 Not Found```](#404-not-found)

### Get all products:

🟢 Request ```GET /api/products/all```

Response [```200 OK (Can be empty array if no products exist)```](#200-ok-201-created-204-no-content)
```json
[
    {
        "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
        "productName": "Dog Food Number 1",
        "productDescription": "The best dog food in the world.",
        "productPrice": 12.99,
        "productQuantity": 60,
        "productKeywords": "dog, food, green",
        "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
        "category": {
            "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
            "categoryName": "Dog",
            "categoryDescription": "Anything related to dogs."
        }
    }
]
```

### Get product by id:

🟢 Request ```GET /api/products/{productId}```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```404 Not Found```](#404-not-found)
```json
{
    "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
    "productName": "Dog Food Number 1",
    "productDescription": "The best dog food in the world.",
    "productPrice": 12.99,
    "productQuantity": 60,
    "productKeywords": "dog, food, green",
    "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
    "category": {
        "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
        "categoryName": "Dog",
        "categoryDescription": "Anything related to dogs."
    }
}
```

## Customer Orders

### Create a new order: ```Customer```

🟡 Request ```POST /api/customerorders/create```
```json
{
    "products": [ // required at least 1 product
        {
            "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718", // required
            "orderedQuantity": 2 // required
        }
    ],
    "orderStatus": "Processing"
}
```

Response [```201 Created```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden)
```json
{
    "orderId": "377603c920240307000913",
    "customer": {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong"
    },
    "products": [
        {
            "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
            "productName": "Dog Food Number 1",
            "productDescription": "The best dog food in the world.",
            "productPrice": 12.99,
            "orderedQuantity": 2,
            "productKeywords": "dog, food, green",
            "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
            "category": {
                "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
                "categoryName": "Dog",
                "categoryDescription": "Anything related to dogs."
            }
        }
    ],
    "orderStatus": "Processing",
    "createdAt": "2024-03-07T00:09:13"
}
```

### Get order by id:

🟢 Request ```GET /api/customerorders/order/{orderId}```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```404 Not Found```](#404-not-found)
```json
{
    "orderId": "377603c920240307000913",
    "customer": {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong"
    },
    "products": [
        {
            "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
            "productName": "Dog Food Number 1",
            "productDescription": "The best dog food in the world.",
            "productPrice": 12.99,
            "orderedQuantity": 2,
            "productKeywords": "dog, food, green",
            "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
            "category": {
                "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
                "categoryName": "Dog",
                "categoryDescription": "Anything related to dogs."
            }
        }
    ],
    "orderStatus": "Processing",
    "createdAt": "2024-03-07T00:09:13"
}
```

### Get all orders by customer id:

🟢 Request ```GET /api/customerorders/customer/{customerId}```

Response [```200 OK (Can be empty array if no orders exist)```](#200-ok-201-created-204-no-content)
```json
[
    {
        "orderId": "377603c920240307000913",
        "products": [
            {
                "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
                "productName": "Dog Food Number 1",
                "productDescription": "The best dog food in the world.",
                "productPrice": 12.99,
                "orderedQuantity": 2,
                "productKeywords": "dog, food, green",
                "productImage": "http://localhost:5290/images/b721be86-4a14-4c36-9a2d-7cba52047160.webp",
                "category": {
                    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
                    "categoryName": "Dog",
                    "categoryDescription": "Anything related to dogs."
                }
            }
        ],
        "orderStatus": "Processing",
        "createdAt": "2024-03-07T00:09:13"
    }
]
```

## Admins

### Register a new admin:

🟡 Request ```POST /api/admins/register```
```json
{
    "username": "admin_123", // required
    "password": "admin_123"  // required
}
```

Response [```201 Created```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request)
```json
{
    "id": "838072d3-d9b7-4123-9bbc-bfe35d44794c",
    "username": "admin_123",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluXzEyMyIsIm5hbWVpZCI6IjgzODA3MmQzLWQ5YjctNDEyMy05YmJjLWJmZTM1ZDQ0Nzk0YyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcwOTczMzAyNCwiZXhwIjoxNzA5NzM2NjI0LCJpYXQiOjE3MDk3MzMwMjQsImlzcyI6InBldG9waWEiLCJhdWQiOiJwZXRvcGlhIn0.s2R_3SkBSQtZ9VWyaxm_O6jHAiYuCWlR2YNmVzVhynM"
}
```

### Login as an admin:

🟡 Request ```POST /api/admins/login```

```json
{
    "username": "admin_123", // required
    "password": "admin_123"  // required
}
```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```400 Bad Request```](#400-bad-request) / [```404 Not Found```](#404-not-found)
```json
{
    "id": "838072d3-d9b7-4123-9bbc-bfe35d44794c",
    "username": "admin_123",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluXzEyMyIsIm5hbWVpZCI6IjgzODA3MmQzLWQ5YjctNDEyMy05YmJjLWJmZTM1ZDQ0Nzk0YyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcwOTczMzAyNCwiZXhwIjoxNzA5NzM2NjI0LCJpYXQiOjE3MDk3MzMwMjQsImlzcyI6InBldG9waWEiLCJhdWQiOiJwZXRvcGlhIn0.s2R_3SkBSQtZ9VWyaxm_O6jHAiYuCWlR2YNmVzVhynM"
}
```

### Get all admins: ```Admin```

🟢 Request ```GET /api/admins/all```

Response [```200 OK (Can be empty array if no admins exist)```](#200-ok-201-created-204-no-content) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden)
```json
[
    {
        "id": "838072d3-d9b7-4123-9bbc-bfe35d44794c",
        "username": "admin_123"
    }
]
```

### Get admin by id: ```Admin```

🟢 Request ```GET /api/admins/{adminId}```

Response [```200 OK```](#200-ok-201-created-204-no-content) / [```401 Unauthorized```](#401-unauthorized) / [```403 Forbidden```](#403-forbidden) / [```404 Not Found```](#404-not-found)
```json
{
    "id": "838072d3-d9b7-4123-9bbc-bfe35d44794c",
    "username": "admin_123"
}
```

## Server Response Status

The server will respond with the following status codes:

### 200 OK, 201 Created, 204 No Content

🟩 The server will respond with a status code of 200 for successful GET requests, 201 for successful POST create requests, and 204 for successful POST delete requests.

> Note that sometimes the server will respond with an empty array, depending on the request.

### 400 Bad Request

🟥 Used for general errors and properties errors

Type 1:

```json
{
    "message": "Invalid password"
}
```

Type 2:

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "$": [
            "JSON deserialization for type 'petopia_server.Models.Customer' was missing required properties, including the following: customerUsername"
        ],
        "Customer": [
            "The Customer field is required."
        ]
    },
    "traceId": "00-3e69866df64405760bc911a019970cc7-3394ff04d9d6c660-00"
}
```

### 401 Unauthorized

🟥 Used when the token cannot be verified

### 403 Forbidden

🟥 Used when the user does not have the required permissions

### 404 Not Found

🟥 .NET framework's default response, used when a single record is not found, or when the path doesn't exist:

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-bd5c1998870db0d34b1d04b86faa52b3-ca66cf084dd33af7-00"
}
```

### 500 Internal Server Error

🟥 Used when the server encounters an error
