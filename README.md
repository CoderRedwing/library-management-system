# Library Management System - Backend

A scalable backend service for a Library Management System, developed using **Node.js**, **Express.js**, and **MongoDB**.  
The system provides user authentication, role-based authorization, book management, and book issuance/return functionalities.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Important Notes](#important-notes)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- User registration and authentication with JWT
- Role-based access control (User and Admin roles)
- Admin functionalities:
  - Add, update, and delete books
  - View total books and total users
- User functionalities:
  - Search and filter books by genre, author, or ID
  - Issue and return books
  - View issued book history
- Book expiry logic after a defined period
- Secure password hashing (bcrypt)
- Automatic creation of default admin on server initialization

---

## Tech Stack

- Node.js (JavaScript Runtime)
- Express.js (Web Framework)
- MongoDB with Mongoose (Database and ODM)
- Multer (File upload handling)
- JSON Web Tokens (Authentication)
- Bcrypt (Password encryption)

---

## Architecture Overview

```
/controllers   - Business logic for authentication, books, admin, and user operations
/middlewares   - Authentication and authorization logic
/models        - Mongoose schemas for Users and Books
/routes        - Modular route definitions
/uploads       - Storage for uploaded book cover images
initAdmin.js   - Auto-creation of default admin user
server.js      - Application entry point
```

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/library-management-backend.git
cd library-management-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file at the root:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

---

## Environment Variables

| Variable | Description |
|:---|:---|
| `PORT` | Port on which the server will run |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |

---

## API Documentation

### Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| POST | `/signup` | Public | Register a new user |
| POST | `/login` | Public | Authenticate user and return JWT token |

---

### Books (`/api/books`)

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| POST | `/add` | Admin | Add a new book (with cover image upload) |
| GET | `/` | User/Admin | Retrieve all books |
| GET | `/:id` | User/Admin | Retrieve book by ID |
| GET | `/genre/:genre` | User/Admin | Retrieve books by genre |
| GET | `/author/:author` | User/Admin | Retrieve books by author |
| PUT | `/:id` | Admin | Update book details |
| DELETE | `/:id` | Admin | Delete a book |

---

### Admin (`/api/admin`)

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| GET | `/total-books` | Admin | Fetch total number of books |
| GET | `/total-users` | Admin | Fetch total number of registered users |

---

### User Operations (`/api/user`)

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| POST | `/issue/:bookId` | User | Issue a book |
| POST | `/return/:bookId` | User | Return a book |
| GET | `/history` | User | View user's issued and returned book history |

---

## Important Notes

- A default **admin** user is automatically created on server initialization if none exists.
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`
- JWT Token must be provided in the `Authorization` header (`Bearer <token>`) for all protected routes.
- Passwords are securely hashed using bcrypt before storing in the database.
- All critical actions are protected by authentication and role-based authorization middleware.

---

## Future Enhancements

- Frontend integration for admin dashboard and user interface
- Password reset functionality (email-based)
- Email notifications for book expiry
- Admin ability to manage users
- Pagination and search optimization
- Deployment using Docker and CI/CD pipelines
- Unit and integration testing with Jest and Supertest

---

## License

This project is open-source and available for educational and personal use.
