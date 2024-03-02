// Get all categories
// GET http://localhost:5290/api/Categories/All

// [
//     {
//         "categoryId": 1,
//         "categoryName": "Dogs",
//         "categoryDescription": "Anything related to dogs.",
//         "products": [
//             {
//                 "productId": 1,
//                 "productName": "MeatD",
//                 "productDescription": "Meat for feeding dogs",
//                 "productPrice": 32.50,
//                 "productQuantity": 12,
//                 "productKeywords": "Dog, Food, Meat",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png"
//             }
//         ]
//     },
//     {
//         "categoryId": 2,
//         "categoryName": "Cats",
//         "categoryDescription": "Anything related to cats.",
//         "products": [
//             {
//                 "productId": 2,
//                 "productName": "VegiC",
//                 "productDescription": "Vegetable for feeding cats",
//                 "productPrice": 12.50,
//                 "productQuantity": 36,
//                 "productKeywords": "Cat, Food, Vegetable",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png"
//             }
//         ]
//     }
// ]

/* ############################################################ */

// Get category by id
// GET http://localhost:5290/api/Categories/{id}

// {
//     "categoryId": 1,
//     "categoryName": "Dogs",
//     "categoryDescription": "Anything related to dogs.",
//     "products": [
//         {
//             "productId": 1,
//             "productName": "MeatD",
//             "productDescription": "Meat for feeding dogs",
//             "productPrice": 32.50,
//             "productQuantity": 12,
//             "productKeywords": "Dog, Food, Meat",
//             "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png"
//         }
//     ]
// }

/* ############################################################ */

// Get all products
// GET http://localhost:5290/api/Products/All

// [
//     {
//         "productId": 1,
//         "productName": "MeatD",
//         "productDescription": "Meat for feeding dogs",
//         "productPrice": 32.50,
//         "productQuantity": 12,
//         "productKeywords": "Dog, Food, Meat",
//         "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//         "category": {
//             "categoryId": 1,
//             "categoryName": "Dogs",
//             "categoryDescription": "Anything related to dogs."
//         }
//     },
//     {
//         "productId": 2,
//         "productName": "VegiC",
//         "productDescription": "Vegetable for feeding cats",
//         "productPrice": 12.50,
//         "productQuantity": 36,
//         "productKeywords": "Cat, Food, Vegetable",
//         "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//         "category": {
//             "categoryId": 2,
//             "categoryName": "Cats",
//             "categoryDescription": "Anything related to cats."
//         }
//     }
// ]

/* ############################################################ */

// Get product by id
// GET http://localhost:5290/api/Products/{id}

// {
//     "productId": 1,
//     "productName": "MeatD",
//     "productDescription": "Meat for feeding dogs",
//     "productPrice": 32.50,
//     "productQuantity": 12,
//     "productKeywords": "Dog, Food, Meat",
//     "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//     "category": {
//         "categoryId": 1,
//         "categoryName": "Dogs",
//         "categoryDescription": "Anything related to dogs."
//     }
// }

/* ############################################################ */

// Get orders by order id
// GET http://localhost:5290/api/CustomerOrders/Order/{id}

// {
//     "orderId": 1,
//     "customer": {
//         "customerId": 1,
//         "customerUsername": "customer_a1",
//         "customerContact": "13579",
//         "customerAddress": "US",
//         "createdAt": "2024-02-27T17:01:16"
//     },
//     "products": [
//         {
//             "productId": 1,
//             "productName": "MeatD",
//             "productDescription": "Meat for feeding dogs",
//             "productPrice": 32.50,
//             "orderedQuantity": 5,
//             "productKeywords": "Dog, Food, Meat",
//             "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//             "category": {
//                 "categoryId": 1,
//                 "categoryName": "Dogs",
//                 "categoryDescription": "Anything related to dogs."
//             }
//         },
//         {
//             "productId": 2,
//             "productName": "VegiC",
//             "productDescription": "Vegetable for feeding cats",
//             "productPrice": 12.50,
//             "orderedQuantity": 10,
//             "productKeywords": "Cat, Food, Vegetable",
//             "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//             "category": {
//                 "categoryId": 2,
//                 "categoryName": "Cats",
//                 "categoryDescription": "Anything related to cats."
//             }
//         }
//     ],
//     "orderStatus": "Processing",
//     "createdAt": "2024-02-27T17:12:57"
// }

/* ############################################################ */

// Get orders by customer id
// GET http://localhost:5290/api/CustomerOrders/Customer/{id}

// [
//     {
//         "orderId": 1,
//         "products": [
//             {
//                 "productId": 1,
//                 "productName": "MeatD",
//                 "productDescription": "Meat for feeding dogs",
//                 "productPrice": 32.50,
//                 "orderedQuantity": 5,
//                 "productKeywords": "Dog, Food, Meat",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//                 "category": {
//                     "categoryId": 1,
//                     "categoryName": "Dogs",
//                     "categoryDescription": "Anything related to dogs."
//                 }
//             },
//             {
//                 "productId": 2,
//                 "productName": "VegiC",
//                 "productDescription": "Vegetable for feeding cats",
//                 "productPrice": 12.50,
//                 "orderedQuantity": 10,
//                 "productKeywords": "Cat, Food, Vegetable",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//                 "category": {
//                     "categoryId": 2,
//                     "categoryName": "Cats",
//                     "categoryDescription": "Anything related to cats."
//                 }
//             }
//         ],
//         "orderStatus": "Processing",
//         "createdAt": "2024-02-27T17:12:57"
//     },
//     {
//         "orderId": 3,
//         "products": [
//             {
//                 "productId": 1,
//                 "productName": "MeatD",
//                 "productDescription": "Meat for feeding dogs",
//                 "productPrice": 32.50,
//                 "orderedQuantity": 1,
//                 "productKeywords": "Dog, Food, Meat",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//                 "category": {
//                     "categoryId": 1,
//                     "categoryName": "Dogs",
//                     "categoryDescription": "Anything related to dogs."
//                 }
//             },
//             {
//                 "productId": 2,
//                 "productName": "VegiC",
//                 "productDescription": "Vegetable for feeding cats",
//                 "productPrice": 12.50,
//                 "orderedQuantity": 1,
//                 "productKeywords": "Cat, Food, Vegetable",
//                 "productImage": "http://localhost:5290/images/87d76107-5c3a-4699-bbae-4191c617d26d.png",
//                 "category": {
//                     "categoryId": 2,
//                     "categoryName": "Cats",
//                     "categoryDescription": "Anything related to cats."
//                 }
//             }
//         ],
//         "orderStatus": "AddedToKart",
//         "createdAt": "2024-02-27T17:20:29"
//     }
// ]
