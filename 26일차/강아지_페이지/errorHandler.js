// const makeError = (response) => {
//     const statusCode = response.status
//     const statusText = response.statusText
    
//     const error = new Error()

//     switch (statusCode) {
//         case 400:
//             error.message = statusText ? statusText : "Bad Request"
//             error.name = "BadRequestError"
//         case 401:
//             error.message = statusText ? statusText : "UnauthorizedError"
//             error.name = "UnauthorizedError"
//         case 403:
//             error.message = statusText ? statusText : "Forbidden"
//             error.name = "ForbiddenError"
//         case 404:
//             error.message = statusText ? statusText : "Not Found"
//             error.name = "NotFoundError"
//         case 500:
//             error.message = statusText ? statusText : "Internal Server Error"
//             error.name = "InternalServerError"
//         default:
//             error.message = statusText ? statusText : "UNKNOWN ERROR"
//             error.name = "UnknownError"
//     }

//     console.log("---- error handling:", error)
//     return error
// }