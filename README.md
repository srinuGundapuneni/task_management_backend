 Task Management API

A RESTful API for managing employees and tasks with JWT authentication, built with Node.js, Express, and MongoDB.

Tech Stack

- Backend Framework: Node.js with Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Validation: Express-validator
- Logging: Morgan & Custom Logger
- Security: Bcrypt for password hashing

Features

-  Complete CRUD operations for Employees and Tasks
-  JWT-based authentication
-  Protected and public routes
-  Task filtering by status, employee, and priority
-  Employee-Task relationship management
-  Input validation and error handling
-  Request logging
-  Modular code structure
-  Sample data seeding

Installation & Setup

Prerequisites
- Node.js (v14 or higher)
- MongoDB ( Atlas)

Steps

1. Clone the repository

2. Install dependencies

3.run the commands in terminal

API endpoints list (with request & response examples) 

The routes are mounted in server.js. Assume your Base URL is http://localhost:5000/


POST /auth/login 
Request Body:

JSON

{
  "email": "jane@example.com",
  "password": "password123"
}
Response (200 OK):

JSON

{
  "success": true,
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Manager",
    "_id": "60a7d5e68b3c9d0015f8a002"
   
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Your.Generated.Token"
}

GET /auth/me (Private)
Request Headers: Authorization: Bearer <YOUR_JWT_TOKEN>

Response (200 OK):

JSON

{
  "success": true,
  "data": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Manager",
    "_id": "60a7d5e68b3c9d0015f8a002",
    "createdAt": "2025-11-28T10:00:00.000Z",
    "updatedAt": "2025-11-28T10:00:00.000Z"
  }
}
GET /employees/:id 
Request Path: /employees/60a7d5e68b3c9d0015f8a003

Response (200 OK):

JSON

{
  "success": true,
  "data": {
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "role": "Designer",
    "_id": "60a7d5e68b3c9d0015f8a003",
    "createdAt": "2025-11-28T10:00:00.000Z",
    "updatedAt": "2025-11-28T10:00:00.000Z"
  }
}
PUT /employees/:id 
Request Path: /employees/60a7d5e68b3c9d0015f8a003 Request Headers: Authorization: Bearer <YOUR_JWT_TOKEN>

Request Body (Only fields to update):

JSON

{
  "role": "Lead Designer"
}
Response (200 OK):

JSON

{
  "success": true,
  "data": {
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "role": "Lead Designer",
    "_id": "60a7d5e68b3c9d0015f8a003",
    "createdAt": "2025-11-28T10:00:00.000Z",
    "updatedAt": "2025-11-28T10:05:00.000Z"
  }
}