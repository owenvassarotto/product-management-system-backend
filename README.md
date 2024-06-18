# Product Management System

A full-stack product management application built with the PERN stack (PostgreSQL, Express, React, Node.js) and TypeScript. This project allows users to add, edit, and delete products.

## Features

- Add new products
- Edit existing products
- Delete products
- API documentation with Swagger
- Client-side routing with React Router DOM
- Form validation with Valibot
- API requests handled with Axios
- Testing with Jest and Supertest

## Technologies Used

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Swagger (API documentation)
- Jest (testing)
- Supertest (testing)

### Frontend
- React
- TypeScript
- React Router DOM
- TailwindCSS
- Axios
- Valibot

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation

1. Clone the backend repository:
   ```bash
   git clone https://github.com/owenvassarotto/product-management-system-backend.git server
   cd server
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in the `backend` directory. Create a `.env` file and add your PostgreSQL configuration.

4. Run the backend server:
   ```bash
   npm run dev
   ```

5. Clone the frontend repository:
   ```bash
   git clone https://github.com/owenvassarotto/product-management-system-frontend.git client
   cd client
   ```

6. Install frontend dependencies:
   ```bash
   npm install
   ```

7. Run the frontend development server:
   ```bash
   npm start
   ```

## Testing

To run tests for the backend, use the following commands:

### Backend Tests
```bash
cd server
npm run test
```
## API Documentation

The backend API is documented using Swagger. Once the backend server is running, you can access the API documentation at:
```
http://localhost:4000/docs
```

## Repositories

- [Backend Repository](https://github.com/owenvassarotto/product-management-system-backend)
- [Frontend Repository](https://github.com/owenvassarotto/product-management-system-frontend)

## Screenshot

![Project Screenshot](link-to-screenshot.png)
