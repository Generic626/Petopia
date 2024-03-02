// Create customer
// POST http://localhost:5290/api/Customers/Register
// {
//     "customerUsername": "customer_a1", // required
//     "customerPassword": "customer_a1", // required
//     "customerContact": "12345678",
//     "customerAddress": "HK"
// }

// Login customer
// POST http://localhost:5290/api/Customers/Login
// {
//     "customerUsername": "customer_a1", // required
//     "customerPassword": "customer_a1" // required
// }

// Modify customer
// POST http://localhost:5290/api/Customers/Modify
// {
//     "customerUsername": "customer_a1", // required
//     "customerPassword": "customer_a1", // required
//     "customerContact": "12345678",
//     "customerAddress": "HK",
//     "newPassword": "1234abcd!"
// }

/* ############################################################ */

// Create categories
// POST http://localhost:5290/api/Categories/Create
// {
//     "categoryName": "Cats", // required
//     "categoryDescription": "Anything related to cats."
// }

// Get all categories
// GET http://localhost:5290/api/Categories/All

// Get category by id
// GET http://localhost:5290/api/Categories/{id}

/* ############################################################ */

// Create products
// POST http://localhost:5290/api/Products/Create
// * FormData (multipart/form-data), you can use form-data in Postman to test this API, image will be upload to [serverAddress/wwwroot/images]
// {
//     "productName": "VegiC", // required
//     "productDescription": "Vegetable for feeding cats",
//     "productPrice": 12.5,
//     "productQuantity": 36,
//     "productKeywords": "Cat, Food, Vegetable",
//     "productImage": Binary File,
//     "categoryId": 2
// }

// Get all products
// GET http://localhost:5290/api/Products/All

// Get product by id
// GET http://localhost:5290/api/Products/{id}

/* ############################################################ */

// Create orders
// POST http://localhost:5290/api/CustomerOrders/Create
// {
//     "customerId": "1",               // required
//     "products": [                    // required at least one
//         {
//             "productId": "1",        // required
//             "orderedQuantity": 5     // required
//         },
//         {
//             "productId": "2",
//             "orderedQuantity": 10
//         }
//     ],
//     "orderStatus": "Processing"
// }

// Get orders by order id
// GET http://localhost:5290/api/CustomerOrders/Order/{id}

// Get orders by customer id
// GET http://localhost:5290/api/CustomerOrders/Customer/{id}
