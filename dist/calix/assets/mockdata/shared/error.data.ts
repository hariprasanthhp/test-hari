export const errorStatus401: any = {
    "status": 401,
    "statusText": "Unauthorized User",
    "ok": false,
    "name": "HttpErrorResponse",
    "error": "User Unathorized"
}
export const errorStatus400: any = {
    "status": 400,
    "statusText": "Invalid Request",
    "ok": false,
    "name": "HttpErrorResponse",
    "error": null
}

export const errorStatus400withoutnull: any = {
    "status": 400,
    "statusText": "Invalid Request",
    "ok": false,
    "name": "HttpErrorResponse",
    "error": undefined
}
export const errorStatus500: any = {
    "timestamp": "2022-09-27T07:53:19.771+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "Java heap space",
    "path": "/api/v1/analytics-engine/notifications"
}

export const errorStatus404: any = {
    "status": 404,
    "statusText": "Not Found",
    "ok": false,
    "name": "HttpErrorResponse",
    "error": "Not Found"
} 

export const errorStatus504: any = {
    "timestamp": "2022-09-27T07:53:19.771+00:00",
    "status": 504,
    "error": "Gateway Timeout",
    "path": "/api/v1/analytics-engine/notifications"
}

export const errorStatus503: any = {
    "timestamp": "2022-09-27T07:53:19.771+00:00",
    "status": 503,
    "error": "Service Temporarily Unavailable",
    "path": "/api/v1/analytics-engine/notifications"
}
