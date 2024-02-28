// In case of error ❌, the server will respond with a JSON object containing the following properties:
// There are mainly 4 types of errors:

// 👇 This is .NET framework default response, used when a single record is not found, or when the API doesn't exists
// 404 Not Found
// {
//     "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
//     "title": "Not Found",
//     "status": 404,
//     "traceId": "00-bd5c1998870db0d34b1d04b86faa52b3-ca66cf084dd33af7-00"
// }

// 👇 This is customised response, used for general errors
// 400 Bad Request
// {
//     "message": "Invalid password"
// }

// 👇 When querying for a list of objects, like /Categories/All, an empty list may returned
// 200 OK
// []

// 👇 Not common, only happen if misconfigured, such as cannot connect to database
// 500 Internal Server Error

// For successful ✅ execution, the status will be:
// 201 Created
// 200 OK
