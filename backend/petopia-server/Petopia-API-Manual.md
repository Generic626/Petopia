# How to use the Petopia API
This document describes how to use the Petopia API.

- [How to use the Petopia API](#how-to-use-the-petopia-api)
  - Customers
    - [Register a new customer](#register-a-new-customer)
    - [Login as a customer](#login-as-a-customer)
    - [Modify customer details ```Customer```](#modify-customer-details-customer)
    - [Get all customers ```Admin```](#get-all-customers-admin)
    - [Get customer by id ```Admin```](#get-customer-by-id-admin)
  - Categories
    - [Create a new category ```Admin```](#create-a-new-category-admin)
    - [Get all categories](#get-all-categories)
    - [Get category by id](#get-category-by-id)
  - Products
    - [Create a new product ```Admin``` ```Form-Data```](#create-a-new-product-admin-form-data)
    - [Remove a product ```Admin```](#remove-a-product-admin)
    - [Get all products](#get-all-products)
    - [Get product by id](#get-product-by-id)
  - Customer Orders
    - [Create a new order ```Customer```](#create-a-new-order-customer)
    - [Get order by id](#get-order-by-id)
    - [Get all orders by customer id](#get-all-orders-by-customer-id)

## Register a new customer

Request ```POST /api/customers/register```
```json
{
    "customerUsername": "customer_a1",
    "customerPassword": "customer_a1",
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore"
}
```

Response
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore",
    "createdAt": "2024-03-06T18:13:09",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImN1c3RvbWVyX2ExIiwibmFtZWlkIjoiZDc1MjY3NjMtNTRhNS00NWJmLWFhY2MtOTMyMzYwOThmYWRiIiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNzA5NzM5MDg5LCJleHAiOjE3MDk3NDI2ODksImlhdCI6MTcwOTczOTA4OSwiaXNzIjoicGV0b3BpYSIsImF1ZCI6InBldG9waWEifQ.LbCzSmecdrXwr74ksvjha8kFmf-c61ffpugmbYwDsc0"
}
```

## Login as a customer

Request ```POST /api/customers/login```

```json
{
    "customerUsername": "customer_a1",
    "customerPassword": "customer_a1"
}
```

Response
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "98765432",
    "customerAddress": "123, ABC Street, Singapore",
    "createdAt": "2024-03-06T18:13:09",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImN1c3RvbWVyX2ExIiwibmFtZWlkIjoiZDc1MjY3NjMtNTRhNS00NWJmLWFhY2MtOTMyMzYwOThmYWRiIiwicm9sZSI6IkN1c3RvbWVyIiwibmJmIjoxNzA5NzM5MDg5LCJleHAiOjE3MDk3NDI2ODksImlhdCI6MTcwOTczOTA4OSwiaXNzIjoicGV0b3BpYSIsImF1ZCI6InBldG9waWEifQ.LbCzSmecdrXwr74ksvjha8kFmf-c61ffpugmbYwDsc0"
}
```

## Modify customer details ```Customer```

Request ```POST /api/customers/modify```
```json
{
    "newContact": "12345678",
    "newAddress": "PolyU, Hong Kong",
    "newPassword": "customer_a1_password"
}
```

Response
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "12345678",
    "customerAddress": "PolyU, Hong Kong",
    "createdAt": "2024-03-06T18:13:09"
}
```

## Get all customers ```Admin```

Request ```GET /api/customers/all```

Response
```json
[
    {
        "customerId": "2cac11e3-d5eb-40c1-b174-b45f72dffb04",
        "customerUsername": "customer_a2",
        "customerContact": "",
        "customerAddress": "",
        "createdAt": "2024-03-06T18:13:16"
    },
    {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong",
        "createdAt": "2024-03-06T18:13:09"
    }
]
```

## Get customer by id ```Admin```

Request ```GET /api/customers/{customerId}```

Response
```json
{
    "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
    "customerUsername": "customer_a1",
    "customerContact": "12345678",
    "customerAddress": "PolyU, Hong Kong",
    "createdAt": "2024-03-06T18:13:09"
}
```

## Create a new category ```Admin```

Request ```POST /api/categories/create```
```json
{
    "categoryName": "Dog",
    "categoryDescription": "Anything related to dogs."
}
```

Response
```json
{
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
    "categoryName": "Dog",
    "categoryDescription": "Anything related to dogs.",
    "products": null,
    "createdAt": "2024-03-06 18:13:43"
}
```

## Get all categories

Request ```GET /api/categories/all```

Response
```json
[
    {
        "categoryId": "3f02a7c7-226b-46db-b286-9f008120ed1e",
        "categoryName": "Cat",
        "categoryDescription": "Anything related to cats.",
        "products": [],
        "createdAt": "2024-03-06T18:13:51"
    },
    {
        "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
        "categoryName": "Dog",
        "categoryDescription": "Anything related to dogs.",
        "products": [],
        "createdAt": "2024-03-06T18:13:43"
    }
]
```

## Get category by id

Request ```GET /api/categories/{categoryId}```

Response
```json
{
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5",
    "categoryName": "Dog",
    "categoryDescription": "Anything related to dogs.",
    "products": [],
    "createdAt": "2024-03-06T18:13:43"
}
```

## Create a new product ```Admin``` ```Form-Data```

Request ```POST /api/products/create```
```json
{
    "productName": "Dog Food Number 1",
    "productDescription": "The best dog food in the world.",
    "productPrice": 12.99,
    "productQuantity": 60,
    "productKeywords": "dog, food, green",
    "productImage": "dog_food.jpg",
    "categoryId": "0384a9ef-d108-477b-ad48-b944537a9ff5"
}
```

Response
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
    },
    "createdAt": "2024-03-06T18:18:11"
}
```

## Remove a product ```Admin```

Request ```POST /api/products/remove/{productId}```

Response ```204 No Content```

## Get all products

Request ```GET /api/products/all```

Response
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
        },
        "createdAt": "2024-03-06T18:18:11"
    }
]
```

## Get product by id

Request ```GET /api/products/{productId}```

Response
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
    },
    "createdAt": "2024-03-06T18:18:11"
}
```

## Create a new order ```Customer```

Request ```POST /api/customerorders/create```
```json
{
    "products": [
        {
            "productId": "2b65330e-ac27-45a7-9a48-fb59deb09718",
            "orderedQuantity": 2
        }
    ],
    "orderStatus": "Processing"
}
```

Response
```json
{
    "orderId": "377603c920240307000913",
    "customer": {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong",
        "createdAt": "2024-03-06T18:13:09"
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

## Get order by id

Request ```GET /api/customerorders/order/{orderId}```

Response
```json
{
    "orderId": "377603c920240307000913",
    "customer": {
        "customerId": "d7526763-54a5-45bf-aacc-93236098fadb",
        "customerUsername": "customer_a1",
        "customerContact": "12345678",
        "customerAddress": "PolyU, Hong Kong",
        "createdAt": "2024-03-06T18:13:09"
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

## Get all orders by customer id

Request ```GET /api/customerorders/customer/{customerId}```

Response
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

## Error Handling

In case of any error, the server will respond with a JSON object containing specific properties. There are mainly 5 types of situation:

1. This is the .NET framework's default response, used when a single record is not found, or when the path doesn't exist:
    
    ```404 Not Found```

    ```json
    {
        "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
        "title": "Not Found",
        "status": 404,
        "traceId": "00-bd5c1998870db0d34b1d04b86faa52b3-ca66cf084dd33af7-00"
    }
    ```

2. This is a customised response, used for general errors:
    
    ```400 Bad Request```

    ```json
    {
        "message": "Invalid password"
    }
    ```

3. When querying for a list of objects, like `/api/categories/all`, an empty list may be returned:
    
    ```200 OK```

    ```json
    []
    ```

4. When deleting a record, the server will respond with:
    
    ```204 No Content```

5. This is not common, and only happens if misconfigured, such as when the server cannot connect to the database:
    
    ```500 Internal Server Error```

For successful execution, the status will be like one of the following:

- ```200 OK```
- ```201 Created```
- ```204 No Content```